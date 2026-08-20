import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { RecrutamentoList } from './pages/RecrutamentoList';
import { RecrutamentoDetail } from './pages/RecrutamentoDetail';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ArtigosSetoresPage } from './pages/blog/ArtigosSetoresPage';
import { BlogIndex } from './pages/blog/BlogIndex';
import { DicasInformacoesPage } from './pages/blog/DicasInformacoesPage';
import { NoticiasPage } from './pages/blog/NoticiasPage';
import { NewsDetailPage } from './pages/blog/NewsDetailPage';
import { CandidaturaPage } from './pages/carreiras/CandidaturaPage';
import { CarreirasIndex } from './pages/carreiras/CarreirasIndex';
import { VagasPage } from './pages/carreiras/VagasPage';
import { ConstrucaoPage } from './pages/industrias/ConstrucaoPage';
import { GovernoInstituicoesPage as IndustriasGovernoInstituicoesPage } from './pages/industrias/GovernoInstituicoesPage';
import { IndustriasIndex } from './pages/industrias/IndustriasIndex';
import { LogisticaPage } from './pages/industrias/LogisticaPage';
import { MineracaoPage } from './pages/industrias/MineracaoPage';
import { OilGasPage } from './pages/industrias/OilGasPage';
import { OffshoreIndex } from './pages/offshore/OffshoreIndex';
import { GovernoInstituicoesPage as RopeAccessGovernoInstituicoesPage } from './pages/offshore/rope-access/GovernoInstituicoesPage';
import { InspecaoPage } from './pages/offshore/rope-access/InspecaoPage';
import { LimpezaPinturaPage } from './pages/offshore/rope-access/LimpezaPinturaPage';
import { ManutencaoPage } from './pages/offshore/rope-access/ManutencaoPage';
import { MontagemReparacaoPage } from './pages/offshore/rope-access/MontagemReparacaoPage';
import { RopeAccessIndex } from './pages/offshore/rope-access/RopeAccessIndex';
import { EstudosDeCasoPage } from './pages/projetos/EstudosDeCasoPage';
import { GaleriaPage } from './pages/projetos/GaleriaPage';
import { ProjetosIndex } from './pages/projetos/ProjetosIndex';
import { RealizadosPage } from './pages/projetos/RealizadosPage';
import { TestemunhosPage } from './pages/projetos/TestemunhosPage';
import { CertificacoesPage } from './pages/recursos/CertificacoesPage';
import { FaqPage } from './pages/recursos/FaqPage';
import { FolhetoPage } from './pages/recursos/FolhetoPage';
import { NormasSegurancaPage } from './pages/recursos/NormasSegurancaPage';
import { RecursosIndex } from './pages/recursos/RecursosIndex';
import { EquipamentosIndustriaisPage } from './pages/sobre/EquipamentosIndustriaisPage';
import { FrescosBensAlimentaresPage } from './pages/sobre/FrescosBensAlimentaresPage';
import { IndustriasPage } from './pages/sobre/IndustriasPage';
import { MissaoVisaoValoresPage } from './pages/sobre/MissaoVisaoValoresPage';
import { PerfilPage } from './pages/sobre/PerfilPage';
import { SetoresAtuacaoPage } from './pages/sobre/SetoresAtuacaoPage';
import { SobreIndex } from './pages/sobre/SobreIndex';
import { AluguerIndex } from './pages/solucoes/aluguer/AluguerIndex';
import { CamioesTrailerPage } from './pages/solucoes/aluguer/CamioesTrailerPage';
import { GovernoInstituicoesPage as AluguerGovernoInstituicoesPage } from './pages/solucoes/aluguer/GovernoInstituicoesPage';
import { GruasPage } from './pages/solucoes/aluguer/GruasPage';
import { PortaContentoresPage } from './pages/solucoes/aluguer/PortaContentoresPage';
import { TransportesMaritimosPage } from './pages/solucoes/aluguer/TransportesMaritimosPage';
import { ComercialPage } from './pages/solucoes/limpeza/ComercialPage';
import { FossaPage } from './pages/solucoes/limpeza/FossaPage';
import { IndustrialPage } from './pages/solucoes/limpeza/IndustrialPage';
import { LimpezaIndex } from './pages/solucoes/limpeza/LimpezaIndex';
import { AcoCarbonoPage } from './pages/solucoes/pipes/AcoCarbonoPage';
import { AcoInoxidavelPage } from './pages/solucoes/pipes/AcoInoxidavelPage';
import { OutrosMateriaisPage } from './pages/solucoes/pipes/OutrosMateriaisPage';
import { PipesIndex } from './pages/solucoes/pipes/PipesIndex';
import { AutomoveisLigeirosPage } from './pages/solucoes/rent-a-car/AutomoveisLigeirosPage';
import { ComerciaisPage } from './pages/solucoes/rent-a-car/ComerciaisPage';
import { GovernoInstituicoesPage as RentACarGovernoInstituicoesPage } from './pages/solucoes/rent-a-car/GovernoInstituicoesPage';
import { RentACarIndex } from './pages/solucoes/rent-a-car/RentACarIndex';
import { SuvPage } from './pages/solucoes/rent-a-car/SuvPage';
import { VansCarrinhasPage } from './pages/solucoes/rent-a-car/VansCarrinhasPage';
import { SolucoesIndex } from './pages/solucoes/SolucoesIndex';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recrutamentos" element={<RecrutamentoList />} />
      <Route path="/recrutamentos/:id" element={<RecrutamentoDetail />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/blog/artigos-setores" element={<ArtigosSetoresPage />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/dicas-informacoes" element={<DicasInformacoesPage />} />
      <Route path="/blog/noticias" element={<NoticiasPage />} />
      <Route path="/blog/noticias/:slug" element={<NewsDetailPage />} />
      <Route path="/carreiras/candidatura" element={<CandidaturaPage />} />
      <Route path="/carreiras" element={<CarreirasIndex />} />
      <Route path="/carreiras/vagas" element={<VagasPage />} />
      <Route path="/industrias/construcao" element={<ConstrucaoPage />} />
      <Route path="/industrias/governo-instituicoes" element={<IndustriasGovernoInstituicoesPage />} />
      <Route path="/industrias" element={<IndustriasIndex />} />
      <Route path="/industrias/logistica" element={<LogisticaPage />} />
      <Route path="/industrias/mineracao" element={<MineracaoPage />} />
      <Route path="/industrias/oil-gas" element={<OilGasPage />} />
      <Route path="/offshore" element={<OffshoreIndex />} />
      <Route path="/offshore/rope-access/governo-instituicoes" element={<RopeAccessGovernoInstituicoesPage />} />
      <Route path="/offshore/rope-access/inspecao" element={<InspecaoPage />} />
      <Route path="/offshore/rope-access/limpeza-pintura" element={<LimpezaPinturaPage />} />
      <Route path="/offshore/rope-access/manutencao" element={<ManutencaoPage />} />
      <Route path="/offshore/rope-access/montagem-reparacao" element={<MontagemReparacaoPage />} />
      <Route path="/offshore/rope-access" element={<RopeAccessIndex />} />
      <Route path="/projetos/estudos-de-caso" element={<EstudosDeCasoPage />} />
      <Route path="/projetos/galeria" element={<GaleriaPage />} />
      <Route path="/projetos" element={<ProjetosIndex />} />
      <Route path="/projetos/realizados" element={<RealizadosPage />} />
      <Route path="/projetos/testemunhos" element={<TestemunhosPage />} />
      <Route path="/recursos/certificacoes" element={<CertificacoesPage />} />
      <Route path="/recursos/faq" element={<FaqPage />} />
      <Route path="/recursos/folheto" element={<FolhetoPage />} />
      <Route path="/recursos/normas-seguranca" element={<NormasSegurancaPage />} />
      <Route path="/recursos" element={<RecursosIndex />} />
      <Route path="/sobre/industrias" element={<IndustriasPage />} />
      <Route path="/sobre/missao-visao-valores" element={<MissaoVisaoValoresPage />} />
      <Route path="/sobre/perfil" element={<PerfilPage />} />
      <Route path="/sobre/setores-atuacao/equipamentos-industriais" element={<EquipamentosIndustriaisPage />} />
      <Route path="/sobre/setores-atuacao/frescos-bens-alimentares" element={<FrescosBensAlimentaresPage />} />
      <Route path="/sobre/setores-atuacao" element={<SetoresAtuacaoPage />} />
      <Route path="/sobre" element={<SobreIndex />} />
      <Route path="/solucoes/aluguer-equipamentos" element={<AluguerIndex />} />
      <Route path="/solucoes/aluguer-equipamentos/camioes-trailer" element={<CamioesTrailerPage />} />
      <Route path="/solucoes/aluguer-equipamentos/governo-instituicoes" element={<AluguerGovernoInstituicoesPage />} />
      <Route path="/solucoes/aluguer-equipamentos/gruas" element={<GruasPage />} />
      <Route path="/solucoes/aluguer-equipamentos/porta-contentores" element={<PortaContentoresPage />} />
      <Route path="/solucoes/aluguer-equipamentos/transportes-maritimos" element={<TransportesMaritimosPage />} />
      <Route path="/solucoes/limpeza/comercial" element={<ComercialPage />} />
      <Route path="/solucoes/limpeza/fossa" element={<FossaPage />} />
      <Route path="/solucoes/limpeza/industrial" element={<IndustrialPage />} />
      <Route path="/solucoes/limpeza" element={<LimpezaIndex />} />
      <Route path="/solucoes/venda-pipes/aco-carbono" element={<AcoCarbonoPage />} />
      <Route path="/solucoes/venda-pipes/aco-inoxidavel" element={<AcoInoxidavelPage />} />
      <Route path="/solucoes/venda-pipes/outros-materiais" element={<OutrosMateriaisPage />} />
      <Route path="/solucoes/venda-pipes" element={<PipesIndex />} />
      <Route path="/solucoes/rent-a-car/automoveis-ligeiros" element={<AutomoveisLigeirosPage />} />
      <Route path="/solucoes/rent-a-car/comerciais" element={<ComerciaisPage />} />
      <Route path="/solucoes/rent-a-car/governo-instituicoes" element={<RentACarGovernoInstituicoesPage />} />
      <Route path="/solucoes/rent-a-car" element={<RentACarIndex />} />
      <Route path="/solucoes/rent-a-car/suv" element={<SuvPage />} />
      <Route path="/solucoes/rent-a-car/vans-carrinhas" element={<VansCarrinhasPage />} />
      <Route path="/solucoes" element={<SolucoesIndex />} />
    </Routes>
  );
}

export default App;
