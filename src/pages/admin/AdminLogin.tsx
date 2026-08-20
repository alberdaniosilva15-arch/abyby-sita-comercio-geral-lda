import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, AlertTriangle, Lock, Smartphone } from 'lucide-react';
import { SVGFilters } from '../../components/SVGFilters';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [blocked, setBlocked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, totpCode }),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.status === 429) {
        setBlocked(true);
        setError('Conta temporariamente bloqueada. Tente novamente mais tarde.');
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Credenciais inválidas');
      }

      navigate('/admin');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Credenciais inválidas';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#071B2E] text-[#EFF4F8] font-sans antialiased flex items-center justify-center p-6 overflow-hidden">
      <SVGFilters />
      
      {/* Decorative Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#1868B8] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.1] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#1868B8] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.08] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="liquid-glass glow-border rounded-3xl p-8 md:p-10 specular-edge">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#1868B8]/10 border border-[#1868B8]/30 flex items-center justify-center text-[#1868B8]">
              <Shield className="w-8 h-8" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-[#EFF4F8] mb-2 tracking-tight">
              Portal de Administração
            </h1>
            <p className="text-[#7E92A6] text-sm">
              Área reservada. Introduza as suas credenciais.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-500/10 border border-red-500/40 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-[#7E92A6] uppercase tracking-[0.2em] mb-2">
                Palavra-passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-[#7E92A6]/60" />
                </div>
                <input
                  type="password"
                  required
                  disabled={blocked || loading}
                  className="w-full bg-[#0F3B63]/30 border border-[#7E92A6]/20 rounded-xl pl-11 pr-4 py-3.5 text-[#EFF4F8] text-sm focus:outline-none focus:border-[#1868B8]/60 focus:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all duration-300 disabled:opacity-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="totpCode" className="block text-[10px] font-bold text-[#7E92A6] uppercase tracking-[0.2em] mb-2">
                Código de autenticação
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Smartphone className="w-4 h-4 text-[#7E92A6]/60" />
                </div>
                <input
                  id="totpCode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  disabled={blocked || loading}
                  className="w-full bg-[#0F3B63]/30 border border-[#7E92A6]/20 rounded-xl pl-11 pr-4 py-3.5 text-[#EFF4F8] text-sm focus:outline-none focus:border-[#1868B8]/60 focus:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all duration-300 disabled:opacity-50"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  placeholder="000000"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || blocked}
              className="shimmer-btn w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#1868B8] to-[#1868B8] text-[#071B2E] font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 tracking-wider uppercase hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] hover:scale-[1.02] active:scale-[0.98] border border-white/20"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#071B2E]/30 border-t-[#071B2E] rounded-full animate-spin" />
                  A validar...
                </span>
              ) : (
                <>
                  Entrar no Portal
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
