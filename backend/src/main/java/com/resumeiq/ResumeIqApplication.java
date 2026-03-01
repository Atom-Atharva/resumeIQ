package com.resumeiq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;

@SpringBootApplication
@EnableRetry
public class ResumeIqApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResumeIqApplication.class, args);
	}

}
