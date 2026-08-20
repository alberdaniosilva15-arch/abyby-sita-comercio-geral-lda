-- 1. Criação da função para gerir o 'updated_at' (Triggers)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ===========================================================================
-- 2. TABELA: recruitment_jobs
-- ===========================================================================
CREATE TABLE public.recruitment_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    area VARCHAR(100) NOT NULL,
    experience_level VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    shift_type VARCHAR(50),
    full_description TEXT NOT NULL,
    responsibilities JSONB DEFAULT '[]'::jsonb CHECK (jsonb_typeof(responsibilities) = 'array'),
    requirements JSONB DEFAULT '[]'::jsonb CHECK (jsonb_typeof(requirements) = 'array'),
    certifications JSONB DEFAULT '[]'::jsonb CHECK (jsonb_typeof(certifications) = 'array'),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger para updated_at
CREATE TRIGGER update_recruitment_jobs_updated_at
    BEFORE UPDATE ON public.recruitment_jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================================================
-- 3. TABELA: recruitment_applications
-- ===========================================================================
CREATE TABLE public.recruitment_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    years_experience INTEGER NOT NULL CHECK (years_experience >= 0),
    has_offshore_experience BOOLEAN NOT NULL DEFAULT false,
    message TEXT,
    cv_url TEXT NOT NULL,
    certificates_url TEXT,
    score INTEGER CHECK (score IS NULL OR (score >= 0 AND score <= 100)),
    classification VARCHAR(50) NOT NULL DEFAULT 'Em análise' 
        CHECK (classification IN ('Em análise', 'Rejeitado', 'Prioritário')),
    status VARCHAR(50) NOT NULL DEFAULT 'Novo' 
        CHECK (status IN ('Novo', 'Em progresso', 'Entrevistado', 'Contratado', 'Arquivado')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Restringe a eliminação da vaga caso existam candidaturas
    CONSTRAINT fk_job FOREIGN KEY (job_id) REFERENCES public.recruitment_jobs(id) ON DELETE RESTRICT
);

-- Trigger para updated_at
CREATE TRIGGER update_recruitment_applications_updated_at
    BEFORE UPDATE ON public.recruitment_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================================================
-- 4. TABELA: recruitment_settings (Single-row)
-- ===========================================================================
CREATE TABLE public.recruitment_settings (
    id INTEGER PRIMARY KEY CHECK (id = 1), -- Garante que só existe 1 registo
    auto_scoring_enabled BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Inserir o único registo por defeito
INSERT INTO public.recruitment_settings (id, auto_scoring_enabled) VALUES (1, false);

-- Trigger para updated_at
CREATE TRIGGER update_recruitment_settings_updated_at
    BEFORE UPDATE ON public.recruitment_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================================================
-- 5. TABELA: leads (Substitui o leads.json)
-- ===========================================================================
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    empresa VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(50),
    servico VARCHAR(255),
    mensagem TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Novo' CHECK (status IN ('Novo', 'Contactado', 'Fechado', 'Arquivado')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger para updated_at
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ===========================================================================
-- 6. SEGURANÇA (Row Level Security)
-- ===========================================================================
-- Activar RLS em todas as tabelas
ALTER TABLE public.recruitment_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitment_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;


-- ===========================================================================
-- 7. ÍNDICES DE PERFORMANCE
-- ===========================================================================
CREATE INDEX idx_recruitment_applications_job_id ON public.recruitment_applications(job_id);
CREATE INDEX idx_recruitment_applications_status ON public.recruitment_applications(status);
CREATE INDEX idx_leads_status ON public.leads(status);
