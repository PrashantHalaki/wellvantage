import { useState } from "react";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type TabType = "Basic" | "Preferences" | "Status";

interface CustomNote {
  id: number;
  date: string;
  note: string;
}

export default function LeadAdd() {
  const [activeTab, setActiveTab] = useState<TabType>("Basic");
  const [customNotes, setCustomNotes] = useState<CustomNote[]>([
    { id: 1, date: "30 July 2025", note: "Called the customer again." },
    { id: 2, date: "12 July 2025", note: "Customer walked in, offered 10% discount." },
    { id: 3, date: "12 July 2025", note: "Lead created." },
  ]);

  const addCustomNote = () => {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCustomNotes([
      { id: Date.now(), date: today, note: "" },
      ...customNotes,
    ]);
  };

  return (
    <div className="h-full bg-background overflow-auto">
      {/* Header */}
      <div className="border-b border-border bg-white sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground lg:ml-0 ml-12">
            Lead Management
          </h1>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("Basic")}
            className={`pb-3 px-1 text-lg font-medium transition-colors relative ${
              activeTab === "Basic"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Basic
            {activeTab === "Basic" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("Preferences")}
            className={`pb-3 px-1 text-lg font-medium transition-colors relative ${
              activeTab === "Preferences"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Preferences
            {activeTab === "Preferences" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("Status")}
            className={`pb-3 px-1 text-lg font-medium transition-colors relative ${
              activeTab === "Status"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Status
            {activeTab === "Status" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Basic Tab */}
        {activeTab === "Basic" && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Basic Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-foreground/80 mb-2 block">First Name*</Label>
                <Input className="bg-white" />
              </div>
              <div>
                <Label className="text-foreground/80 mb-2 block">Last Name*</Label>
                <Input className="bg-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-foreground/80 mb-2 block">Phone</Label>
                <div className="flex gap-2">
                  <Select defaultValue="+91">
                    <SelectTrigger className="w-24 bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+91">+91</SelectItem>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input className="flex-1 bg-white" />
                </div>
              </div>
              <div>
                <Label className="text-foreground/80 mb-2 block">Email</Label>
                <Input type="email" className="bg-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-foreground/80 mb-2 block">Gender</Label>
                <Select>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground/80 mb-2 block">Date of Birth</Label>
                <div className="relative">
                  <Input type="date" className="bg-white pr-10" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label className="text-foreground/80 mb-2 block">Height</Label>
                <div className="flex gap-2">
                  <Input className="flex-1 bg-white" />
                  <Select defaultValue="cm">
                    <SelectTrigger className="w-20 bg-[#E8F5E9] text-primary border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="ft">ft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-foreground/80 mb-2 block">Weight</Label>
                <div className="flex gap-2">
                  <Input className="flex-1 bg-white" />
                  <Select defaultValue="kg">
                    <SelectTrigger className="w-20 bg-[#E8F5E9] text-primary border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="px-24 py-6 text-lg bg-primary hover:bg-primary/90">
                Update
              </Button>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "Preferences" && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Preference</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-foreground/80 mb-2 block">Activity Level</Label>
                <Select defaultValue="very-active">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="very-active">very active</SelectItem>
                    <SelectItem value="active">active</SelectItem>
                    <SelectItem value="moderate">moderate</SelectItem>
                    <SelectItem value="sedentary">sedentary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground/80 mb-2 block">Wellness Goals</Label>
                <Select defaultValue="lose-weight">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose-weight">lose weight</SelectItem>
                    <SelectItem value="gain-muscle">gain muscle</SelectItem>
                    <SelectItem value="maintain">maintain fitness</SelectItem>
                    <SelectItem value="improve-health">improve health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-foreground/80 mb-2 block">Primary Fitness Focus</Label>
                <Select defaultValue="gym-workout">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gym-workout">Gym workout</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="strength">Strength training</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground/80 mb-2 block">Preferred Gym Time</Label>
                <Select defaultValue="morning">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="night">Night</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-foreground/80 mb-2 block">Preferred Workout Intensity</Label>
                <Select defaultValue="light">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="intense">Intense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground/80 mb-2 block">Medical Concerns</Label>
                <Select defaultValue="diabetes">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diabetes">Diabetes</SelectItem>
                    <SelectItem value="hypertension">Hypertension</SelectItem>
                    <SelectItem value="asthma">Asthma</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label className="text-foreground/80 mb-2 block">Previous Gym Experience</Label>
                <Select defaultValue="yes">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">yes</SelectItem>
                    <SelectItem value="no">no</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="px-24 py-6 text-lg bg-primary hover:bg-primary/90">
                Update
              </Button>
            </div>
          </div>
        )}

        {/* Status Tab */}
        {activeTab === "Status" && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-foreground/80 mb-2 block">Inquiry Date</Label>
                <div className="relative">
                  <Input defaultValue="22 July 2025" className="bg-muted pr-10" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <Label className="text-foreground/80 mb-2 block">Assigned To Admin/Receptionist</Label>
                <Select defaultValue="ram-mohan">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ram-mohan">Ram Mohan</SelectItem>
                    <SelectItem value="ratna-pathak">Ratna Pathak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-foreground/80 mb-2 block">Interest Level</Label>
                <Select defaultValue="hot">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="warm">Warm</SelectItem>
                    <SelectItem value="cold">Cold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground/80 mb-2 block">Follow Up Status</Label>
                <Select defaultValue="needs-followup">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="needs-followup">Needs Follow Up</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-foreground/80 mb-2 block">Preferred Package</Label>
                <Select defaultValue="package">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="package">Package</SelectItem>
                    <SelectItem value="basic">Basic Package</SelectItem>
                    <SelectItem value="premium">Premium Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground/80 mb-2 block">Preferred PT Package (If Any)</Label>
                <Select defaultValue="package">
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="package">Package</SelectItem>
                    <SelectItem value="pt-basic">PT Basic</SelectItem>
                    <SelectItem value="pt-premium">PT Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-6">
              <Label className="text-foreground/80 mb-2 block">How They Heard About The Gym</Label>
              <Select defaultValue="social-media">
                <SelectTrigger className="bg-white max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social-media">Social Media</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="advertisement">Advertisement</SelectItem>
                  <SelectItem value="walk-in">Walk-in</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Notes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-foreground/80">Custom notes</Label>
                <Button
                  type="button"
                  size="icon"
                  className="rounded-full w-8 h-8 bg-primary hover:bg-primary/90"
                  onClick={addCustomNote}
                >
                  <span className="text-xl leading-none">+</span>
                </Button>
              </div>

              <div className="space-y-4">
                {customNotes.map((note, index) => (
                  <div key={note.id} className="grid grid-cols-[200px_1fr] gap-4 items-start">
                    <div className="relative">
                      <Input 
                        defaultValue={note.date} 
                        className={index === customNotes.length - 1 ? "bg-muted" : "bg-white"}
                        readOnly={index === customNotes.length - 1}
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    </div>
                    <Textarea
                      defaultValue={note.note}
                      placeholder={index === 0 ? "Enter note..." : ""}
                      className={`min-h-[60px] resize-none ${
                        index === customNotes.length - 1 ? "bg-muted" : "bg-white"
                      }`}
                      readOnly={index === customNotes.length - 1}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="px-24 py-6 text-lg bg-primary hover:bg-primary/90">
                Update
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
