import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';

export const TaskWrapper = ({
  title,
  count,
  children,
  defaultOpen = true
}: {
  title: string;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  return (
    <Collapsible defaultOpen={defaultOpen} className="mb-4 space-y-2">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="group w-full justify-start p-2 font-normal"
        >
          <ChevronDown className="size-4 shrink-0 -rotate-90 transition-transform duration-200 group-data-[state=open]:rotate-0" />
          <span className="ml-2">{title}</span>
          <span className="ml-2 text-muted-foreground">{count}</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
};
