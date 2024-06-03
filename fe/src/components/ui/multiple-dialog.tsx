import { DialogProps } from "@radix-ui/react-dialog";
import { Slot, SlotProps } from "@radix-ui/react-slot";
import {
    Children,
    cloneElement,
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

type Maybe<T> = T | null | undefined;

const MultiDialogContainerContext = createContext<unknown>(null);
MultiDialogContainerContext.displayName = "MultiDialogContainerContext";

export function useMultiDialog<T = unknown>(): [
    Maybe<T>,
    React.Dispatch<React.SetStateAction<Maybe<T>>>,
];
export function useMultiDialog<T = unknown>(
    v: T,
): [boolean, (v: boolean) => void];
export function useMultiDialog<T = unknown>(v?: T) {
    const s = useContext(MultiDialogContainerContext) as [
        Maybe<T>,
        React.Dispatch<React.SetStateAction<Maybe<T>>>,
    ];
    const [dialog, setDialog] = s;

    const onOpenChange = useCallback(
        (o: boolean) => (o ? setDialog(v) : setDialog(null)),
        [setDialog, v],
    );

    const open = dialog === v;
    const result = useMemo(() => [open, onOpenChange] as const, [onOpenChange, open]);

    if (!s)
        throw new Error(
            "Cannot use 'useMultiDialog' outside 'MultiDialogProvider'.",
        );
    if (v == null) return s;

    return result;
}

export function MultiDialogTrigger<T = unknown>({
    value,
    onClick,
    ...props
}: SlotProps &
    React.RefAttributes<HTMLElement> & {
        value: T;
    }) {
    const [, open] = useMultiDialog(value);
    const oc = useCallback<React.MouseEventHandler<HTMLElement>>(
        (e) => {
            open(true);
            onClick && onClick(e);
        },
        [open, onClick],
    );
    return <Slot onClick={oc} {...props} />;
}

export function MultiDialogContainer<T = unknown>({
    value,
    children,
    ...props
}: Omit<DialogProps, "open" | "onOpenChange"> & {
    value: T;
    children?: JSX.Element;
}) {
    const [open, onOpenChange] = useMultiDialog(value);

    return useMemo(() => {
        Children.only(children);
        return children
            ? cloneElement(children, {
                ...props,
                open,
                onOpenChange,
            })
            : null;
    }, [props, onOpenChange, children, open]);
}

type Builder<T = unknown> = {
    readonly Trigger: (
        ...args: Parameters<typeof MultiDialogTrigger<T>>
    ) => React.ReactNode;
    readonly Container: (
        ...args: Parameters<typeof MultiDialogContainer<T>>
    ) => React.ReactNode;
};

const builder = {
    Trigger: MultiDialogTrigger,
    Container: MultiDialogContainer,
} as const;

export type MultiDialogBuilder<T = unknown> = (
    builder: Builder<T>,
) => React.ReactNode;
export function MultiDialog<T = unknown>({
    defaultOpen = null,
    children,
}: Readonly<{
    defaultOpen?: T | null;
    children?: React.ReactNode | MultiDialogBuilder<T>;
}>) {
    const [state, setState] = useState<T | null>(defaultOpen);

    const c = useMemo(
        () => (typeof children === "function" ? children(builder) : children),
        [children],
    );

    const value = useMemo(() => [state, setState], [state, setState]);

    return (
        <MultiDialogContainerContext.Provider value={value}>
            {c}
        </MultiDialogContainerContext.Provider>
    );
}