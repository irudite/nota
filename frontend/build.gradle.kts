plugins {
  id("java")
  id("application")
  id("org.openjfx.javafxplugin") version "0.1.0"
}

repositories {
  mavenCentral()
}

application {
  mainClass.set("com.app.frontend.Main")
}

javafx {
    version = "21"
    modules("javafx.controls")
}

dependencies {
  testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
}
