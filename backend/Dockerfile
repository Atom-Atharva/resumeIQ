# Stage 1: Build the application
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Copy the jar from the build stage (adjust the name if necessary)
COPY --from=build /app/target/*.jar app.jar

# Expose the port (Render defaults to 10000, but Spring Boot usually uses 8080)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]