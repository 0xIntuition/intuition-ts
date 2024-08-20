import React, { ReactNode } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

interface SupportFAQCardData {
  question: string
  answer: string | ReactNode
}

interface SupportFAQCardProps {
  title: string
  faqItems: SupportFAQCardData[]
}

export const SupportFAQ: React.FC<SupportFAQCardProps> = ({
  title,
  faqItems,
}) => {
  return (
    <div className="flex flex-col">
      <Text
        variant={TextVariant.bodyLarge}
        weight={TextWeight.medium}
        className="text-foreground/90"
      >
        {title}
      </Text>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-foreground/70 text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/70">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
