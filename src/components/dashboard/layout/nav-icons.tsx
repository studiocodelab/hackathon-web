
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';

 import {ChartPie} from '@phosphor-icons/react/dist/ssr/ChartPie';
 import {Calendar} from '@phosphor-icons/react/dist/ssr/Calendar';
 import {List} from '@phosphor-icons/react/dist/ssr/List';
 import {Plus} from '@phosphor-icons/react/dist/ssr/Plus';
 import {ChartBar} from '@phosphor-icons/react/dist/ssr/ChartBar';
import { Archive } from '@phosphor-icons/react/dist/ssr/Archive';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
 'ChartPie': ChartPie,
 'Calendar': Calendar,
 'List': List,
 'Plus': Plus,
 'ChartBar': ChartBar,
 'Archive': Archive,
  user: UserIcon,
  users: UsersIcon,
} as Record<string, Icon>;
 