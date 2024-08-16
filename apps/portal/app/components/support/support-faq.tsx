import React from 'react'

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
  answer: string
}

interface SupportFAQCardProps {
  faqItems: SupportFAQCardData[]
}

export const SupportFAQ: React.FC<SupportFAQCardProps> = ({ faqItems }) => {
  return (
    <div className="flex flex-col gap-6">
      <Text
        variant={TextVariant.headline}
        weight={TextWeight.medium}
        className="text-primary/90"
      >
        FAQs
      </Text>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-primary/90">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-secondary-foreground/90">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
