export const styles = {
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: 20,
    borderRadius: 8,
    width: 400,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
  },
};
