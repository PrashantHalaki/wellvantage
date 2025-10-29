import LeadForm from '@/components/leadManagement/leadForm';
import Leads from '@/components/leadManagement/listLeads';
import { useState } from 'react';
import { mockLeads } from '@/utils/mockLeads';

export default function LeadsPage() {
  const [leads, setLeads] = useState(mockLeads);
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [selectedLead, setSelectedLead] = useState<number | null>(null);

  return (
    <>
      {mode === 'view' ? (
        <Leads setMode={setMode} setSelectedLead={setSelectedLead} leads={leads} />
      ) : (
        <LeadForm
          setMode={setMode}
          setLeads={setLeads}
          selectedLead={selectedLead}
          lead={selectedLead !== null ? leads[selectedLead] : undefined}
        />
      )}
    </>
  );
}
