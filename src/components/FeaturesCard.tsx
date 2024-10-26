import { CardFeatures } from "@/types/Client-types";

const FeaturesCard = ({ feature }: { feature: CardFeatures }) => {
  return (
    <div className="max-w-sm  rounded-lg shadow ">
      <a href="#">
        <img
          className="rounded-t-lg aspect-[5/3]  "
          src={feature.image}
          alt={feature.text}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {feature.icon} {feature.text}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default FeaturesCard;
