import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "../../../common/src/events/subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log("Event data!", data);

    msg.ack();
  }
}
