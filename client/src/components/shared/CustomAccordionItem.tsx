import { LucideProps } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ContactsSkeleton from "../drawer-components/ContactsSkeleton";

interface CustomAccordionItem {
  children: React.ReactNode;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  length: number;
  loading?: boolean;
}

const CustomAccordionItem = ({
  children,
  Icon,
  text,
  length,
  loading,
}: CustomAccordionItem) => {
  return (
    <AccordionItem value={text}>
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <Icon className="size-4" />
          {!loading ? (
            <>
              <p>{text}</p>
              <p className="text-muted-foreground text-xs">({length})</p>
            </>
          ) : (
            <div className=" h-4 w-24 bg-accent rounded-md animate-pulse" />
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {children}
        {loading &&
          Array.from({ length: 3 }).map((_, i) => <ContactsSkeleton key={i} />)}
      </AccordionContent>
    </AccordionItem>
  );
};

export default CustomAccordionItem;
