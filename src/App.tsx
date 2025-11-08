import { FormEvent, useMemo, useState } from "react";
import TrainingPortal, {
  TrainingAssignment,
  TrainingRecommendation,
} from "./modules/TrainingPortal";

const assignmentSeed: TrainingAssignment[] = [
  {
    id: "leadership-101",
    title: "Liderlik 101",
    description: "Takım yönetimi ve delegasyon üzerine temel prensipler.",
    dueDate: "2024-07-15",
    completed: true,
    completionDate: "2024-06-20",
    certificateIssued: true,
    certificateId: "CERT-9842",
    tags: ["liderlik", "yönetim"],
  },
  {
    id: "customer-empathy",
    title: "Vatandaş Empati Atölyesi",
    description:
      "Vatandaşlarla etkili iletişim kurma ve ihtiyaç analizi yapma teknikleri.",
    dueDate: "2024-07-30",
    completed: false,
    tags: ["iletişim", "hizmet"],
  },
  {
    id: "digital-tools",
    title: "Dijital Belediyecilik Araçları",
    description:
      "Şikayet takip ve süreç otomasyon araçlarının günlük işlere entegrasyonu.",
    dueDate: "2024-08-12",
    completed: false,
    tags: ["dijital", "otomasyon"],
  },
  {
    id: "conflict-resolution",
    title: "Çatışma Yönetimi",
    description: "Zor vatandaş görüşmelerinde etkin çözüm üretme yöntemleri.",
    dueDate: "2024-06-28",
    completed: true,
    completionDate: "2024-06-10",
    certificateIssued: true,
    certificateId: "CERT-9711",
    tags: ["iletişim", "çatışma"],
  },
];

const recommendationCatalogSeed: TrainingRecommendation[] = [
  {
    keyword: "iletişim",
    title: "İleri Düzey İletişim Teknikleri",
    summary:
      "Sözlü ve sözsüz iletişimde güven inşa etmeyi ve aktif dinlemeyi uygulamalı olarak öğretir.",
    estimatedDuration: "4 saat",
  },
  {
    keyword: "dijital",
    title: "Kent Teknolojilerinde Güncel Trendler",
    summary:
      "Yeni nesil dijital hizmet platformları ve veri paylaşımı standartlarına odaklanır.",
    estimatedDuration: "3 saat",
  },
  {
    keyword: "liderlik",
    title: "Kamu Liderliği Mentorluk Programı",
    summary:
      "Çapraz ekip koordinasyonu ve paydaş yönetimi için vaka çalışmaları içerir.",
    estimatedDuration: "6 hafta",
  },
  {
    keyword: "otomasyon",
    title: "Süreç İyileştirme ve Otomasyon",
    summary:
      "Yinelenen işleri otomatikleştirmek için pratik araçlar ve süreç tasarımı egzersizleri.",
    estimatedDuration: "5 saat",
  },
];

export default function App() {
  const [assignments] = useState<TrainingAssignment[]>(assignmentSeed);
  const [performanceGaps, setPerformanceGaps] = useState<string[]>([
    "İletişim", "Dijital Hizmet Yetkinliği",
  ]);
  const [newGap, setNewGap] = useState("");

  const recommendationCatalog = useMemo(
    () => recommendationCatalogSeed,
    []
  );

  const handleAddGap = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = newGap.trim();
    if (!normalized) {
      return;
    }
    if (performanceGaps.some((gap) => gap.toLowerCase() === normalized.toLowerCase())) {
      setNewGap("");
      return;
    }
    setPerformanceGaps((prev) => [...prev, normalized]);
    setNewGap("");
  };

  return (
    <div style={{ padding: 24, backgroundColor: "#f1f5f9", minHeight: "100vh" }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ marginBottom: 8 }}>BELEDİYE360 Eğitim Portali</h1>
        <p style={{ margin: 0, color: "#475569", maxWidth: 600 }}>
          Takımınızın yetkinliklerini izleyin, eğitim atamalarını yönetin ve performans
          açıklarına göre önerilen programları keşfedin.
        </p>
      </header>

      <section
        style={{
          marginBottom: 32,
          padding: 16,
          backgroundColor: "#fff",
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 2px rgba(15,23,42,0.08)",
          maxWidth: 560,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Performans Açığı Teması Ekle</h2>
        <form
          onSubmit={handleAddGap}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}
        >
          <input
            type="text"
            value={newGap}
            onChange={(event) => setNewGap(event.target.value)}
            placeholder="Örn. Analitik Raporlama"
            style={{
              flex: "1 1 280px",
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #cbd5f5",
              fontSize: 14,
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Temayı Ekle
          </button>
        </form>
      </section>

      <TrainingPortal
        assignments={assignments}
        performanceGaps={performanceGaps}
        recommendationCatalog={recommendationCatalog}
      />
    </div>
  );
}
