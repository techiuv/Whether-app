const SkeletonLoader = ({ height = "20px", width = "100%", borderRadius = "4px" }) => (
    <div
        className="bg-gray-300 animate-pulse rounded-xl"
        style={{
            height,
            width,
        }}
    />
);

export default SkeletonLoader;
