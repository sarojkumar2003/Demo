import { Header } from './components/layout/Header';
import { Hero } from './components/home/Hero';
import { About } from './components/home/About';
import { Services } from './components/home/Services';
import { Process } from './components/home/Process';
import { Projects } from './components/home/Projects';
import { Contact } from './components/home/Contact';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/ui/BackToTop';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      <Header />
      <main>
        <Hero />
        <About />
        <Process />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
