import { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function Progress() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));
    const go = () => {
      NProgress.start();
      setTimeout(()=>NProgress.done(), 350);
    };
    links.forEach(l=>l.addEventListener('click', go));
    return () => links.forEach(l=>l.removeEventListener('click', go));
  }, []);
  return null;
}
