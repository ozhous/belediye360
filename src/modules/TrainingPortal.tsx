import { useMemo } from "react";
import type { CSSProperties } from "react";

export interface TrainingAssignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completionDate?: string;
  certificateIssued?: boolean;
  certificateId?: string;
  tags: string[];
}

export interface TrainingRecommendation {
  keyword: string;
  title: string;
  summary: string;
  estimatedDuration: string;
}

interface TrainingPortalProps {
  assignments: TrainingAssignment[];
  performanceGaps: string[];
  recommendationCatalog: TrainingRecommendation[];
}

const containerStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: 24,
};

const cardStyle: CSSProperties = {
  border: "1px solid #d0d7de",
  borderRadius: 12,
  padding: 16,
  backgroundColor: "#fff",
  boxShadow: "0 1px 2px rgba(15,23,42,0.08)",
};

const sectionTitleStyle: CSSProperties = {
  marginTop: 0,
  marginBottom: 16,
  fontSize: 18,
  fontWeight: 600,
};

const timelineListStyle: CSSProperties = {
  listStyle: "none",
  paddingLeft: 0,
  margin: 0,
  display: "grid",
  gap: 16,
};

const timelineItemStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  columnGap: 12,
  alignItems: "flex-start",
};

const timelineIndicatorStyle: CSSProperties = {
  width: 14,
  height: 14,
  borderRadius: "50%",
  border: "2px solid #1d4ed8",
  marginTop: 4,
};

const badgeBaseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
};

function getStatusBadgeStyle(completed: boolean): CSSProperties {
  return {
    ...badgeBaseStyle,
    backgroundColor: completed ? "#dcfce7" : "#fee2e2",
    color: completed ? "#166534" : "#991b1b",
    border: `1px solid ${completed ? "#bbf7d0" : "#fecaca"}`,
  };
}

export function TrainingPortal({
  assignments,
  performanceGaps,
  recommendationCatalog,
}: TrainingPortalProps) {
  const completedAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.completed),
    [assignments]
  );

  const upcomingAssignments = useMemo(
    () =>
      assignments
        .filter((assignment) => !assignment.completed)
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
    [assignments]
  );

  const suggestedRecommendations = useMemo(
    () =>
      recommendationCatalog.filter((rec) =>
        performanceGaps.some((gap) =>
          rec.keyword.toLocaleLowerCase("tr-TR").includes(
            gap.toLocaleLowerCase("tr-TR")
          )
        )
      ),
    [recommendationCatalog, performanceGaps]
  );

  return (
    <div style={containerStyle}>
      <section style={{ display: "grid", gap: 24 }}>
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Eğitim Atamaları</h2>
          <p style={{ marginBottom: 16 }}>
            Tamamlanan eğitimler: <strong>{completedAssignments.length}</strong> / {assignments.length}
          </p>
          <ol style={timelineListStyle}>
            {assignments
              .slice()
              .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
              .map((assignment) => (
                <li key={assignment.id} style={timelineItemStyle}>
                  <span
                    style={{
                      ...timelineIndicatorStyle,
                      backgroundColor: assignment.completed ? "#1d4ed8" : "#fff",
                    }}
                  />
                  <div style={{ display: "grid", gap: 4 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontWeight: 600 }}>{assignment.title}</span>
                      <span style={getStatusBadgeStyle(assignment.completed)}>
                        {assignment.completed ? "Tamamlandı" : "Devam Ediyor"}
                      </span>
                    </div>
                    <p style={{ margin: 0, color: "#475569", fontSize: 14 }}>
                      {assignment.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        fontSize: 12,
                        color: "#1f2937",
                      }}
                    >
                      <span>
                        Bitiş: <strong>{assignment.dueDate}</strong>
                      </span>
                      {assignment.completed && assignment.completionDate ? (
                        <span>
                          Tamamlanma: <strong>{assignment.completionDate}</strong>
                        </span>
                      ) : null}
                      {assignment.certificateIssued ? (
                        <span>
                          Sertifika: <strong>{assignment.certificateId}</strong>
                        </span>
                      ) : (
                        <span>Sertifika bekleniyor</span>
                      )}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {assignment.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            ...badgeBaseStyle,
                            backgroundColor: "#eff6ff",
                            border: "1px solid #bfdbfe",
                            color: "#1e3a8a",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        </div>

        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Tamamlanan Eğitimler ve Sertifikalar</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {completedAssignments.map((assignment) => (
              <article
                key={assignment.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: 12,
                  background: "linear-gradient(135deg,#f1f5f9,#f8fafc)",
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{assignment.title}</h3>
                  <p style={{ margin: "4px 0", fontSize: 13, color: "#475569" }}>
                    Tamamlanma tarihi: {assignment.completionDate ?? "-"}
                  </p>
                </div>
                <div style={{ textAlign: "right", fontSize: 12 }}>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    {assignment.certificateIssued
                      ? `Sertifika No: ${assignment.certificateId ?? "-"}`
                      : "Sertifika bekleniyor"}
                  </p>
                </div>
              </article>
            ))}
            {completedAssignments.length === 0 ? (
              <p style={{ margin: 0, color: "#64748b" }}>
                Henüz tamamlanan eğitim bulunmuyor.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <aside style={{ display: "grid", gap: 24 }}>
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Performans Açığı Temaları</h2>
          <ul style={{ margin: 0, paddingLeft: 16, color: "#475569" }}>
            {performanceGaps.map((gap) => (
              <li key={gap}>{gap}</li>
            ))}
          </ul>
        </div>

        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Önerilen Eğitimler</h2>
          <p style={{ fontSize: 13, color: "#64748b" }}>
            Anahtar kelime eşleşmesine göre belirlenen öneriler.
          </p>
          {suggestedRecommendations.length > 0 ? (
            <ul style={{ listStyle: "none", paddingLeft: 0, display: "grid", gap: 12 }}>
              {suggestedRecommendations.map((recommendation) => (
                <li
                  key={`${recommendation.keyword}-${recommendation.title}`}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    padding: 12,
                    backgroundColor: "#f8fafc",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{recommendation.title}</strong>
                    <span style={{ fontSize: 12, color: "#1f2937" }}>
                      {recommendation.estimatedDuration}
                    </span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "#475569" }}>
                    {recommendation.summary}
                  </p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#0f172a" }}>
                    Etiket: #{recommendation.keyword}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: 13, color: "#64748b" }}>
              Şu anda öneri bulunmuyor. Farklı anahtar kelimeler eklemeyi deneyin.
            </p>
          )}
        </div>

        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Yaklaşan Eğitimler</h2>
          {upcomingAssignments.length > 0 ? (
            <ul style={{ listStyle: "none", paddingLeft: 0, display: "grid", gap: 12 }}>
              {upcomingAssignments.map((assignment) => (
                <li
                  key={`upcoming-${assignment.id}`}
                  style={{
                    border: "1px solid #cbd5f5",
                    borderRadius: 10,
                    padding: 12,
                    backgroundColor: "#eef2ff",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{assignment.title}</strong>
                    <span style={{ fontSize: 12 }}>Bitiş: {assignment.dueDate}</span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "#4338ca" }}>
                    {assignment.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: 13, color: "#64748b" }}>
              Yaklaşan eğitim ataması bulunmuyor.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

export default TrainingPortal;
