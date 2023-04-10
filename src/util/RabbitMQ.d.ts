import { Connection, Channel } from "amqplib";
export declare const RabbitMQ: {
    connection: Connection | null;
    channel: Channel | null;
    init: () => Promise<void>;
};
