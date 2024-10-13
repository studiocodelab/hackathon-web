
    import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'Lista_szkole', title: 'Lista szkoleń', href: paths.dashboard.Lista_szkolen, icon: 'List' },
  { key: 'Kalendarz', title: 'Kalendarz', href: paths.dashboard.Kalendarz, icon: 'Calendar' },
  { key: 'Dodaj_szkolenie', title: 'Dodaj szkolenie', href: paths.dashboard.Dodaj_szkolenie, icon: 'Plus' },
  { key: 'Dodaj_ankiete', title: 'Dodaj ankietę', href: paths.dashboard.Dodaj_ankiete, icon: 'ChartBar' },
  { key: 'Analiza', title: 'Wyniki ankiet', href: paths.dashboard.Analiza, icon: 'ChartPie' },

] satisfies NavItemConfig[]; 