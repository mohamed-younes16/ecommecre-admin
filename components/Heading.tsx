import React from "react";

const Heading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full">
      <h2 className=" text-3xl max-md:text-2xl font-bold">{title} </h2>
      <p className="text-muted-foreground max-md:text-base text-lg">{description} </p>
    </div>
  );
};

export default Heading;
