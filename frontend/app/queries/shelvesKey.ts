export const shelvesKey = {
    all: ['shelves'] as const,
    lists: () => [...shelvesKey.all, 'list'] as const,
    detail: (id: string) =>
        [...shelvesKey.all, 'detail', id] as const,
}
