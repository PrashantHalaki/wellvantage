import { useState } from 'react';
import { Search, Plus, ChevronDown, MessageCircle, Phone, Package, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Lead } from '@/utils/types';

const getInterestBadgeStyles = (level: string) => {
  switch (level) {
    case 'Hot':
      return 'bg-badge-hot text-badge-hot-text border-badge-hot-text/20';
    case 'Cold':
      return 'bg-badge-cold text-badge-cold-text border-badge-cold-text/20';
    case 'Warm':
      return 'bg-badge-warm text-badge-warm-text border-badge-warm-text/20';
    default:
      return '';
  }
};

const getInterestEmoji = (level: string) => {
  switch (level) {
    case 'Hot':
      return '🔥';
    case 'Cold':
      return '❄️';
    case 'Warm':
      return '💡';
    default:
      return '';
  }
};

export default function Leads({
  leads,
  setMode,
  setSelectedLead,
}: {
  leads: Lead[];
  setMode: (mode: 'view' | 'edit') => void;
  setSelectedLead: (selectedLead: number) => void;
}) {
  const [activeTab, setActiveTab] = useState<'Active' | 'Archieved'>('Active');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className='h-full bg-background'>
      {/* Header */}
      <div className='border-b border-border bg-white'>
        <div className='flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
          <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground lg:ml-0 ml-12'>
            Lead Management
          </h1>
          <Button
            size='icon'
            className='rounded-full bg-primary hover:bg-accent'
            onClick={() => setMode('edit')}
          >
            <Plus className='w-5 h-5' />
          </Button>
        </div>
      </div>

      <div className='px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
        {/* Tabs */}
        <div className='flex gap-8 mb-6 border-b border-border'>
          <button
            onClick={() => setActiveTab('Active')}
            className={`pb-3 px-1 text-lg font-medium transition-colors relative ${
              activeTab === 'Active'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Active
            {activeTab === 'Active' && (
              <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary' />
            )}
          </button>
          <button
            onClick={() => setActiveTab('Archieved')}
            className={`pb-3 px-1 text-lg font-medium transition-colors relative ${
              activeTab === 'Archieved'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Archieved
          </button>
        </div>

        {/* Search and Filters */}
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-4'>
          <div className='flex-1 sm:max-w-md relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
            <Input placeholder='Search' className='pl-10 bg-white border-border' />
          </div>
          <Select defaultValue='1-june'>
            <SelectTrigger className='w-full sm:w-64 bg-white'>
              <SelectValue placeholder='Last interaction' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1-june'>Last interaction : 1 June 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter Buttons */}
        <div className='flex items-center gap-2 sm:gap-3 mb-4 overflow-x-auto pb-2'>
          <Button variant='outline' className='bg-white whitespace-nowrap text-sm'>
            Interest Level <ChevronDown className='ml-2 w-4 h-4' />
          </Button>
          <Button variant='outline' className='bg-white whitespace-nowrap text-sm'>
            Assigned to <ChevronDown className='ml-2 w-4 h-4' />
          </Button>
          <Button
            variant='outline'
            className='bg-white whitespace-nowrap text-sm hidden sm:inline-flex'
          >
            Created At ↕
          </Button>
          <Button
            variant='outline'
            className='bg-white whitespace-nowrap text-sm hidden sm:inline-flex'
          >
            Name Alphabetical ↕
          </Button>
          <Button variant='ghost' size='icon' className='shrink-0'>
            <X className='w-5 h-5' />
          </Button>
        </div>

        {/* Selection Info */}
        <p className='text-sm text-muted-foreground mb-4 italic'>
          {leads.length} of 120 leads selected
        </p>

        {/* Table */}
        <div className='bg-white rounded-lg border border-border overflow-hidden overflow-x-auto'>
          <table className='w-full min-w-[800px]'>
            <thead className='bg-muted/30 border-b border-border'>
              <tr>
                <th className='text-left py-4 px-6 text-sm font-semibold text-foreground'>Name</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-foreground'>
                  Interest Level
                </th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-foreground'>
                  Assigned to
                </th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-foreground'>
                  Last Intraction
                </th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-foreground'>
                  Follow Up
                </th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-foreground'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.slice((currentPage - 1) * 10, currentPage * 10).map((lead, index) => (
                <tr
                  key={lead.id}
                  className={
                    index !== Math.min(10, leads.length - (currentPage - 1) * 10) - 1
                      ? 'border-b border-border'
                      : ''
                  }
                >
                  <td className='py-4 px-6'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='w-9 h-9'>
                        <AvatarFallback className='bg-muted text-muted-foreground text-sm'>
                          {lead.basicDetails.firstName[0]}
                          {lead.basicDetails.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className='text-primary font-medium hover:underline cursor-pointer'
                        onClick={() => {
                          setSelectedLead((currentPage - 1) * 10 + index);
                          setMode('edit');
                        }}
                      >
                        {lead.basicDetails.firstName} {lead.basicDetails.lastName}
                      </span>
                    </div>
                  </td>
                  <td className='py-4 px-6'>
                    {lead?.status?.interestLevel && (
                      <Badge
                        variant='outline'
                        className={`${getInterestBadgeStyles(
                          lead?.status?.interestLevel
                        )} font-medium`}
                      >
                        {getInterestEmoji(lead?.status?.interestLevel)}
                        {lead?.status?.interestLevel}
                      </Badge>
                    )}
                  </td>
                  <td className='py-4 px-6 text-foreground/80 capitalize'>
                    {lead?.status?.assignedTo?.split('-').concat(' ').join(' ')}
                  </td>
                  <td className='py-4 px-6 text-foreground/80'>{lead?.status?.lastInteraction}</td>
                  <td className='py-4 px-6'>
                    <Badge
                      variant='outline'
                      className='bg-badge-followup text-badge-followup-text border-badge-followup-text/20 font-medium'
                    >
                      {lead?.status?.followUpStatus}
                    </Badge>
                  </td>
                  <td className='py-4 px-6'>
                    <div className='flex items-center gap-3'>
                      <button className='p-2 hover:bg-accent rounded-lg text-[#25D366] hover:text-foreground transition-colors'>
                        <MessageCircle className='w-5 h-5 ' />
                      </button>
                      <button className='p-2 hover:bg-accent rounded-lg transition-colors'>
                        <Phone className='w-5 h-5 text-foreground/60' />
                      </button>
                      <button className='p-2 hover:bg-accent rounded-lg transition-colors'>
                        <Package className='w-5 h-5 text-foreground/60' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-4 mt-6'>
          <span className='text-sm text-muted-foreground sm:mr-4'>
            Showing {Math.min((currentPage - 1) * 10 + 1, leads.length)} to{' '}
            {Math.min(currentPage * 10, leads.length)} of {leads.length} entries
          </span>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              className='w-8 h-8'
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </Button>
            {Array.from({ length: Math.ceil(leads.length / 10) }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'ghost'}
                size='icon'
                className={`w-8 h-8 ${currentPage === page ? 'bg-primary hover:bg-accent' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant='ghost'
              size='icon'
              className='w-8 h-8'
              onClick={() =>
                setCurrentPage(Math.min(Math.ceil(leads.length / 10), currentPage + 1))
              }
              disabled={currentPage === Math.ceil(leads.length / 10)}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
