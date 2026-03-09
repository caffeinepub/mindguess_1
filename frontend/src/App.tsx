import { GamePage } from './pages/GamePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
      <Header />
      <main className="flex-1">
        <GamePage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
