package org.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.beans.factory.annotation.Value;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.regions.Region;
import java.net.URI;

@Configuration
@Profile("dynamodb-local")
public class DynamoDBConfig {
  @Value("${aws.dynamodb.region}")
  private String region;

  @Value("${aws.dynamodb.endpoint}")
  private String endpoint;

  @Bean 
  public DynamoDbClient dynamoDbClient() {
    return DynamoDbClient.builder()
                  .endpointOverride(URI.create(endpoint))
                  .region(Region.US_EAST_1)
                  .build();
  }
}
