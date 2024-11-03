const StarRating: React.FC<{ rating: number, onRatingChange?: (rating: number) => void }> = ({ rating, onRatingChange }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {[2, 4, 6, 8, 10].map(star => (
            <span
                key={star}
                style={{ color: star <= rating ? 'gold' : 'gray', cursor: onRatingChange ? 'pointer' : 'default', fontSize: '24px' }}
                onClick={() => onRatingChange && onRatingChange(star)}
            >
                ★
            </span>
        ))}
    </div>
);

export default StarRating;
