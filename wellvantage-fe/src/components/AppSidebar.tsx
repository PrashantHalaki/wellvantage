import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCog,
  ClipboardList,
  Briefcase,
  TrendingUp,
  Lightbulb,
  Dumbbell,
  LogOut,
  Check,
  X,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

const navigationItems = [
  { title: 'Dashboard', icon: LayoutDashboard, url: '/dashboard' },
  {
    title: 'Lead Management',
    icon: Users,
    url: '/leads',
  },
  {
    title: 'WellVantage Leads',
    icon: Check,
    url: '/wv_leads',
  },
  { title: 'Member Management', icon: UserCog, url: '/members' },
  { title: 'Membership Management', icon: ClipboardList, url: '/membership' },
  { title: 'Attendance Tracking', icon: ClipboardList, url: '/attendance' },
  { title: 'Employee Management', icon: Briefcase, url: '/employees' },
  { title: 'Revenue Management', icon: TrendingUp, url: '/revenue' },
  { title: 'Expense Management & Profit', icon: Lightbulb, url: '/expenses' },
  { title: 'Workout Management', icon: Dumbbell, url: '/workouts' },
];

export function AppSidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const { signOut } = useAuth();
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className='fixed inset-0 bg-black/50 z-40 lg:hidden' onClick={onClose} />}

      <aside
        className={`
        fixed lg:relative
        w-60 bg-sidebar-bg flex flex-col h-full
        z-50 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      >
        {/* Logo and Brand */}
        <div className='p-6 border-b border-border/50 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center'>
              <Dumbbell className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='font-bold text-lg text-foreground'>WellVantage</h1>
            </div>
          </div>
          <button
            onClick={onClose}
            className='lg:hidden p-2 hover:bg-accent rounded-lg transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-4 space-y-1 overflow-y-auto'>
          {navigationItems.map((item) => (
            <div key={item.title}>
              <NavLink
                to={item.url}
                onClick={() => onClose?.()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-active text-white font-medium'
                      : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                  }`
                }
              >
                <item.icon className='w-5 h-5' />
                <span className='text-sm'>{item.title}</span>
              </NavLink>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className='p-4 border-t border-border/50'>
          <div className='flex items-center gap-3 px-4 py-3 bg-accent/50 rounded-lg mb-2'>
            <Avatar className='w-8 h-8'>
              <AvatarFallback className='bg-primary text-white text-sm'>DS</AvatarFallback>
            </Avatar>
            <span className='text-sm font-medium text-foreground'>David Smith</span>
          </div>
          <button
            className='flex items-center gap-3 px-4 py-2 w-full text-foreground/70 hover:text-foreground transition-colors'
            onClick={signOut}
          >
            <LogOut className='w-5 h-5' />
            <span className='text-sm'>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
