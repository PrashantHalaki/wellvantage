import LeadForm from '@/components/leadManagement/leadForm';
import Leads from '@/components/leadManagement/listLeads';
import { useState } from 'react';
import { mockLeads } from '@/utils/mockLeads';

export default function LeadsPage() {
  const [leads, setLeads] = useState(mockLeads);
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [selectedLead, setSelectedLead] = useState<number | null>(null);

  const setModeWithIndex = (newMode: 'view' | 'edit', index: number | null = null) => {
    setMode(newMode);
    setSelectedLead(index);
  };

  return (
    <>
      {mode === 'view' ? (
        <Leads setMode={setModeWithIndex} leads={leads} />
      ) : (
        <LeadForm
          setMode={setModeWithIndex}
          setLeads={setLeads}
          selectedLead={selectedLead}
          lead={selectedLead !== null ? leads[selectedLead] : undefined}
        />
      )}
    </>
  );
}
