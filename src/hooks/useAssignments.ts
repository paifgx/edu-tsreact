export function useAssignments() {
  return {
    overlay: {} as Record<string, string | null>,
    assign: (incidentId: string, userId: string | null) => {
      void incidentId;
      void userId;
    },
  };
}
