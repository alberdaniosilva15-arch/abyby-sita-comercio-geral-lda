import { Router } from 'express';
import { z } from 'zod';
import multer from 'multer';
import { supabase } from '../supabase';
import { uploadToCloudinary } from '../upload-cloudinary';
import { apiLimiter } from '../security';

export const recrutamentoRouter = Router();

// Multer in-memory storage para encaminhar pro Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limite
  fileFilter: (_req, file, cb) => {
    // Apenas PDF e DOC
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Apenas ficheiros PDF ou DOC(X) são permitidos.'));
    }
  },
});

// Helper de envio/notificação de candidatura
async function notifyRecruitmentTeam(params: {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  score: number | null;
  classification: string;
  cvUrl: string;
}) {
  const targetEmail = process.env.RECRUITMENT_EMAIL || 'abybysita@recrutamentos.com';
  console.log(
    `[RECRUTAMENTO] Nova candidatura recebida para ${targetEmail}: Candidato: ${params.fullName}, Vaga: ${params.jobTitle}, Score: ${params.score}, CV: ${params.cvUrl}`
  );
  // Ponto de extensão preparado para envio automático (EmailJS / SMTP) assim que configurado
}

// Validação profunda de Magic Bytes para impedir uploads de malware disfarçado de PDF/DOC
function isValidDocumentMagicBytes(buffer: Buffer): boolean {
  if (!buffer || buffer.length < 8) return false;
  // PDF: %PDF- (0x25 0x50 0x44 0x46 0x2D)
  if (buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46 && buffer[4] === 0x2d) {
    return true;
  }
  // DOC (Microsoft OLE2 Compound Binary): 0xD0 0xCF 0x11 0xE0
  if (buffer[0] === 0xd0 && buffer[1] === 0xcf && buffer[2] === 0x11 && buffer[3] === 0xe0) {
    return true;
  }
  // DOCX / ZIP: PK (0x50 0x4B 0x03 0x04)
  if (buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04) {
    return true;
  }
  return false;
}

// GET /api/recrutamento/jobs
recrutamentoRouter.get('/jobs', apiLimiter, async (req, res) => {
  try {
    const str = (v: unknown): string | undefined =>
      typeof v === 'string' && v.trim() ? v.trim() : undefined;
    const type = str(req.query.type);
    const area = str(req.query.area);
    const experience = str(req.query.experience);
    const q = str(req.query.q);

    let query = supabase.from('recruitment_jobs').select('*').eq('is_active', true);

    if (type) query = query.eq('type', type);
    if (area) query = query.eq('area', area);
    if (experience) query = query.eq('experience_level', experience);
    if (q) {
      // Sanitização estrita para impedir injeção de cláusulas PostgREST
      const safeQ = q.replace(/[^a-zA-Z0-9\sÀ-ÿ]/g, '').trim();
      if (safeQ) {
        query = query.or(`title.ilike.%${safeQ}%,short_description.ilike.%${safeQ}%`);
      }
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ jobs: data ?? [] });
  } catch (err) {
    console.error('Erro ao listar vagas:', err);
    res.status(500).json({ error: 'Erro ao listar vagas' });
  }
});

// GET /api/recrutamento/jobs/:id
recrutamentoRouter.get('/jobs/:id', apiLimiter, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('recruitment_jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Vaga não encontrada' });
    res.json(data);
  } catch (_err) {
    res.status(500).json({ error: 'Erro ao buscar vaga' });
  }
});

// POST /api/recrutamento/applications
recrutamentoRouter.post(
  '/applications',
  apiLimiter,
  upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'certificates', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const cvFile = files['cv']?.[0];
      const certFile = files['certificates']?.[0];

      if (!cvFile) {
        return res.status(400).json({ error: 'O upload do CV é obrigatório.' });
      }

      // Verificação de assinatura de ficheiro (Anti-malware / Anti-spoofing)
      if (!isValidDocumentMagicBytes(cvFile.buffer)) {
        return res.status(400).json({ error: 'Formato de ficheiro inválido. Apenas PDFs e DOC(X) legítimos são permitidos.' });
      }

      if (certFile && !isValidDocumentMagicBytes(certFile.buffer)) {
        return res.status(400).json({ error: 'Ficheiro de certificados inválido.' });
      }

      const parsed = z
        .object({
          job_id: z.string().uuid(),
          full_name: z.string().min(2).max(100),
          email: z.string().email().max(100),
          phone: z.string().min(6).max(30),
          nationality: z.string().min(2).max(50),
          years_experience: z.preprocess((v) => Number(v), z.number().min(0).max(60)),
          has_offshore_experience: z.preprocess((v) => v === 'true', z.boolean()),
          message: z.string().max(2000).optional(),
        })
        .safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({ error: 'Dados inválidos', issues: parsed.error.issues });
      }

      const { data: job, error: jobErr } = await supabase
        .from('recruitment_jobs')
        .select('*')
        .eq('id', parsed.data.job_id)
        .single();
      if (jobErr || !job) {
        return res.status(404).json({ error: 'Vaga não encontrada' });
      }

      // Upload seguro para o Cloudinary (armazenamento estático com extensão preservada)
      const cv_url = await uploadToCloudinary(cvFile.buffer, 'recrutamento/cvs', 'raw', cvFile.originalname);
      let certificates_url: string | null = null;
      if (certFile) {
        certificates_url = await uploadToCloudinary(certFile.buffer, 'recrutamento/certs', 'raw', certFile.originalname);
      }

      // Calcular Score
      let score: number | null = 0;
      if (parsed.data.has_offshore_experience) score += 30;
      if (parsed.data.years_experience >= 5) score += 15;
      if (certFile) score += 20;

      // Obter configuração de Auto-scoring
      const { data: settings } = await supabase
        .from('recruitment_settings')
        .select('*')
        .eq('id', 1)
        .single();
      const auto_scoring_enabled = settings?.auto_scoring_enabled || false;

      let classification = 'Em análise';
      if (auto_scoring_enabled) {
        if (score <= 30) classification = 'Rejeitado';
        else if (score >= 61) classification = 'Prioritário';
        else classification = 'Em análise';
      } else {
        score = null; // null significa "não avaliado"
      }

      const applicationData = {
        ...parsed.data,
        cv_url,
        certificates_url,
        score,
        classification,
        status: 'Novo',
      };

      const { error: insertErr } = await supabase
        .from('recruitment_applications')
        .insert([applicationData]);
      if (insertErr) throw insertErr;

      // Notificar equipa de recrutamento
      await notifyRecruitmentTeam({
        fullName: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        jobTitle: job.title,
        score,
        classification,
        cvUrl: cv_url,
      });

      res.status(201).json({ message: 'Candidatura enviada com sucesso!' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro interno ao processar candidatura';
      console.error('Erro na candidatura:', message);
      res.status(500).json({ error: message });
    }
  }
);
