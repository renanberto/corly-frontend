import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Link to="/" className="text-base font-semibold text-slate-900">
            Corly
          </Link>
          <p className="text-xs text-slate-500">Beta público · Orquestração documental premium</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <a href="/docs" className="hover:text-slate-900">
            Docs
          </a>
          <a href="/terms" className="hover:text-slate-900">
            Termos
          </a>
          <a href="/privacy" className="hover:text-slate-900">
            Privacidade
          </a>
          <span className="text-xs text-slate-400">Status: Beta público</span>
        </div>
      </div>
    </footer>
  );
};
