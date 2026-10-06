import type { AlertColor, AlertProps, SnackbarOrigin } from '@mui/material';
import { create } from 'zustand';

export interface SnackbarAction {
    label: string;
    onClick: () => void;
}

export interface SnackbarOptions {
    severity?: AlertColor;
    /** Milliseconds before auto close. `null` keeps it open until dismissed. */
    autoHideDuration?: number | null;
    anchorOrigin?: SnackbarOrigin;
    variant?: AlertProps['variant'];
    /** Optional button rendered next to the message. Closes the snackbar when clicked. */
    action?: SnackbarAction;
    /** Hide the close (x) icon. */
    hideCloseButton?: boolean;
}

interface SnackbarState extends Required<Omit<SnackbarOptions, 'action'>> {
    open: boolean;
    message: string;
    action?: SnackbarAction;
    /** Changes on every show() so a new message restarts the auto hide timer. */
    key: number;
}

interface SnackbarActions {
    show: (message: string, options?: SnackbarOptions) => void;
    close: () => void;
    /** Clears message and options once the exit transition has finished. */
    reset: () => void;
}

export const SNACKBAR_DEFAULTS = {
    severity: 'info',
    autoHideDuration: 4000,
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    variant: 'filled',
    hideCloseButton: false,
} as const satisfies Required<Omit<SnackbarOptions, 'action'>>;

const initialState: SnackbarState = {
    open: false,
    message: '',
    action: undefined,
    key: 0,
    ...SNACKBAR_DEFAULTS,
};

export const useSnackbarStore = create<SnackbarState & SnackbarActions>()((set) => ({
    ...initialState,
    show: (message, options = {}) =>
        set((state) => ({
            ...initialState,
            ...options,
            message,
            open: true,
            key: state.key + 1,
        })),
    close: () => set({ open: false }),
    reset: () => set((state) => ({ ...initialState, key: state.key })),
}));

type ShortcutOptions = Omit<SnackbarOptions, 'severity'>;

/**
 * Imperative API for use anywhere (components, API clients, event handlers),
 * no hook or provider required.
 *
 *   snackbar.success(t('snackbar.success'))
 *   snackbar.show('Custom', { severity: 'warning', autoHideDuration: null })
 */
export const snackbar = {
    show: (message: string, options?: SnackbarOptions) => useSnackbarStore.getState().show(message, options),
    success: (message: string, options?: ShortcutOptions) =>
        useSnackbarStore.getState().show(message, { ...options, severity: 'success' }),
    error: (message: string, options?: ShortcutOptions) =>
        useSnackbarStore.getState().show(message, { ...options, severity: 'error' }),
    warning: (message: string, options?: ShortcutOptions) =>
        useSnackbarStore.getState().show(message, { ...options, severity: 'warning' }),
    info: (message: string, options?: ShortcutOptions) =>
        useSnackbarStore.getState().show(message, { ...options, severity: 'info' }),
    close: () => useSnackbarStore.getState().close(),
};
