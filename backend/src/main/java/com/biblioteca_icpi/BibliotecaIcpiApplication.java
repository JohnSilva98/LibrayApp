package com.biblioteca_icpi;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.biblioteca_icpi.service.DatabaseSeederService;

@SpringBootApplication
public class BibliotecaIcpiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BibliotecaIcpiApplication.class, args);
	}
	@Bean
    CommandLineRunner runner(DatabaseSeederService seeder) {
        return args -> {
            seeder.popularBanco();
        };
    }
}
