interface PaginationProps {
    next: boolean;
    previous: boolean;
    onPageChange: (next: boolean) => void;
}

export function Pagination({ next, previous, onPageChange }: PaginationProps) {
    return (
        <div className="pagination-buttons mt-3">
            <button
                className="btn btn-outline-primary"
                onClick={() => onPageChange(false)}
                disabled={!previous}
            >
                Previous
            </button>
            <button
                className="btn btn-outline-primary"
                onClick={() => onPageChange(true)}
                disabled={!next}
            >
                Next
            </button>
        </div>
    );
}
