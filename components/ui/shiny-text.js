const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`text-transparent bg-clip-text pointer-events-none inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, transparent 40%, rgba(0, 255, 255, 1) 50%, transparent 60%), linear-gradient(rgba(224, 255, 255, 1), rgba(224, 255, 255, 1))',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
        textShadow: '0 0 20px rgba(0,255,255,0.5)'
      }}>
      {text}
    </div>
  );
};

export default ShinyText;