package com.jrtechnologies;

import com.azure.core.amqp.AmqpRetryMode;
import com.azure.core.amqp.AmqpRetryOptions;
import com.azure.core.amqp.AmqpTransportType;
import com.azure.messaging.servicebus.*;
import com.azure.messaging.servicebus.models.ServiceBusReceiveMode;
import lombok.extern.log4j.Log4j2;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.util.Properties;

/**
 * Hello world!
 */
@Log4j2
public class App {
    public static Properties mainProperties = null;
    static ServiceBusClientBuilder sharedConnectionBuilder = null;
    static ServiceBusSenderAsyncClient sender = null;
    static ServiceBusProcessorClient receiver = null;

    public static void main(String[] args) {
        System.out.println("Hello World!");
        readApplicationProperties();
        sharedConnectionBuilder =  new ServiceBusClientBuilder()
                .transportType(AmqpTransportType.AMQP).connectionString(mainProperties.get("app.servicebus.connection.string").toString())
                .retryOptions(new AmqpRetryOptions().setDelay(Duration.ofSeconds(5)).setMaxDelay(Duration.ofSeconds(5))
                        .setMaxRetries(5).setTryTimeout(Duration.ofSeconds(30)).setMode(AmqpRetryMode.EXPONENTIAL));
        receiver = sharedConnectionBuilder
                .processor()
                .queueName(mainProperties.get("app.producer.queue").toString()).processMessage(App::processMessage)
                .processError(App::processError).receiveMode(ServiceBusReceiveMode.PEEK_LOCK).disableAutoComplete()
                .buildProcessorClient();
        receiver.start();
        sender = sharedConnectionBuilder.sender().queueName(mainProperties.get("app.producer.queue").toString()).buildAsyncClient();
        sender.sendMessage(new ServiceBusMessage("Dummy Message")).block();
        log.info("Sender initiated");
    }
    private static void processMessage(ServiceBusReceivedMessageContext serviceBusReceivedMessageContext) {
        ServiceBusReceivedMessage message = serviceBusReceivedMessageContext.getMessage();
        log.info("Processing message. Session: {} Sequence {} MessageID {} EnqueuedTime {} Body {}", message.getMessageId(),
                message.getSequenceNumber(), message.getMessageId(),  message.getEnqueuedTime(), message.getBody());
        serviceBusReceivedMessageContext.complete();

    }
    private static void processError(ServiceBusErrorContext context) {
        log.info("Error when receiving messages from namespace: '%s'. Entity: '%s'%n",
                context.getFullyQualifiedNamespace(), context.getEntityPath());
    }

    public static void readApplicationProperties(){
        InputStream file = null;
    try {
        file = ClassLoader.getSystemResourceAsStream("application.properties");
        //file = new FileInputStream(path);
    } catch (Exception e) {
        System.err.println("No application.properties file found on the base folder of the jar file. Program will exit");;
        System.exit(2);
    }

    //load all the properties from this file
    try {
        mainProperties = new Properties();
        mainProperties.load(file);
        file.close();
    } catch (IOException e) {
        e.printStackTrace();
    }

    //we have loaded the properties, so close the file handle


    }
}
