package org.example;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TableInitializer {
    
    @Bean
    public CommandLineRunner createTable(DynamoDbClient client) {
        return args -> {
            try {
                CreateTableRequest request = CreateTableRequest.builder()
                    .tableName("notes")
                    .keySchema(KeySchemaElement.builder()
                        .attributeName("noteId")
                        .keyType(KeyType.HASH)
                        .build())
                    .attributeDefinitions(AttributeDefinition.builder()
                        .attributeName("noteId")
                        .attributeType(ScalarAttributeType.S)
                        .build())
                    .billingMode(BillingMode.PAY_PER_REQUEST)
                    .build();
                
                client.createTable(request);
                System.out.println("Table 'notes' created successfully");
            } catch (ResourceInUseException e) {
                System.out.println("Table 'notes' already exists");
            }
        };
    }
}
