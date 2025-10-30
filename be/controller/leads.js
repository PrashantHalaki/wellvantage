// In-memory storage for leads
let leads = [];
let nextId = 1;

// Create a new lead
exports.createLead = (req, res) => {
  const lead = req.body;
  lead.id = nextId++;
  leads.push(lead);
  res.status(201).json(lead);
};

// Get all leads
exports.getLeads = (req, res) => {
  res.json(leads);
};

// Get a single lead by ID
exports.getLeadById = (req, res) => {
  const id = parseInt(req.params.id);
  const lead = leads.find((l) => l.id === id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });
  res.json(lead);
};

// Update a lead by ID
exports.updateLead = (req, res) => {
  const id = parseInt(req.params.id);
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return res.status(404).json({ error: 'Lead not found' });
  const updatedLead = { ...leads[index], ...req.body, id };
  leads[index] = updatedLead;
  res.json(updatedLead);
};

// Delete a lead by ID
exports.deleteLead = (req, res) => {
  const id = parseInt(req.params.id);
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return res.status(404).json({ error: 'Lead not found' });
  leads.splice(index, 1);
  res.status(204).send();
};
