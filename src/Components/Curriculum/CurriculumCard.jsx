const CurriculumCard = ({ image, title, desc }) => {
  return (
    <div className="group relative flex flex-col items-center swoosh-container">
      <div className="relative mb-4 z-10">
        <img
          src={image}
          loading="lazy"
          decoding="async"
          alt={title}
          className="h-40 w-40 object-cover rounded-full  border-4 border-amber-300 
          shadow-lg transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="text-xl font-bold text-center text-text-light-primary">{title}</h3>

      <p className="text-center mt-2 text-sm text-text-light-secondary">{desc}</p>
    </div>
  );
};

export default CurriculumCard;
