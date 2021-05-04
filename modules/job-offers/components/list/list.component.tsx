import React, { FunctionComponent, useEffect, useRef } from "react"
import { ListItem } from "../list-item/list-item.component"
import { ListWrapper } from "./list.styled"
import { JobOffer } from "../../job-offers.types"

interface Props {
  jobOffers: JobOffer[]
  selectOffer: (offer: JobOffer) => void
  selectedOffer?: JobOffer
}

export const List: FunctionComponent<Props> = ({
  jobOffers,
  selectOffer,
  selectedOffer,
}) => {
  const listWrapperRef = useRef<HTMLDivElement>(null)
  const listItemsRef = useRef<Record<string, HTMLLIElement>>({})

  useEffect(() => {
    if (selectedOffer && listWrapperRef.current && listItemsRef.current) {
      const currentListItem = listItemsRef.current[selectedOffer.id]
      const pixelsScrolled = listWrapperRef.current.scrollTop

      if (currentListItem) {
        const { offsetTop, offsetHeight } = currentListItem

        if (
          offsetTop < pixelsScrolled ||
          offsetTop + offsetHeight > pixelsScrolled + window.innerHeight
        ) {
          listWrapperRef.current.scroll({
            top: offsetTop - window.innerHeight / 2,
            behavior: "smooth",
          })
        }
      }
    }
  }, [listWrapperRef.current, listItemsRef.current, selectedOffer])

  return (
    <ListWrapper ref={listWrapperRef}>
      {jobOffers.length === 0 ? (
        <p>loading offers...</p>
      ) : (
        <ul>
          {/*
            In real implementation I'd optimize the list rendering by using an infinite
            scroll or react-virtualized (depending on the API and business requirements).
          */}
          {jobOffers.map((jobOffer) => {
            const onClick = () => {
              selectOffer(jobOffer)
            }
            const assignRef = (element: HTMLLIElement) => {
              listItemsRef.current[jobOffer.id] = element
            }

            return (
              <ListItem
                key={jobOffer.id}
                jobOffer={jobOffer}
                onClick={onClick}
                ref={assignRef}
              />
            )
          })}
        </ul>
      )}
    </ListWrapper>
  )
}
