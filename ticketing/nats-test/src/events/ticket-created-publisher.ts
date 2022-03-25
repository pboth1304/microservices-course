import { Publisher } from "./base-publisher";
import { Subjects } from "../../../common/src/events/subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;

  publish(data: { id: string; title: string; price: number }): void {}
}
