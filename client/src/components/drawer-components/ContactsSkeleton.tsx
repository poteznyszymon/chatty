const ContactsSkeleton = () => {
  return (
    <div className="flex items-center gap-2 rounded-md p-1">
      <div className="size-11 bg-muted animate-pulse rounded-full" />
      <div className="flex flex-col gap-1">
        <div className="bg-muted animate-pulse w-32 h-4 rounded-md" />
        <div className="bg-muted animate-pulse w-12 h-4 rounded-md" />
      </div>
    </div>
  );
};

export default ContactsSkeleton;
