package com.example.app1;

import android.app.Activity;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.text.InputType;
import android.util.*;
import android.view.View;
import android.widget.*;

// This is the login screen
public class MainActivity extends Activity {
    private MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Initialize MediaPlayer with your audio file
        mediaPlayer = MediaPlayer.create(this, R.raw.song1);
        mediaPlayer.setLooping(true); // Set looping repeat
        mediaPlayer.start(); // Start playback

        // Set the layout as the content view
        setContentView(R.layout.activity_loginactivity);

        // "New? Sign Up" Button - Call the method to set up the button
        setSignupButton();

        // sign-in functionally - Call the method to set up the button
        setSignInButton();
    }

    private void setSignInButton() {
        Button loginButton = findViewById(R.id.loginButton);
        loginButton.setOnClickListener(v -> {
            // Get username and password from input fields
            EditText usernameInput = findViewById(R.id.usernameInput);
            EditText passwordInput = findViewById(R.id.passwordInput);

            String username = usernameInput.getText().toString().trim();
            String password = passwordInput.getText().toString().trim();

            // Validate input message
            if (username.isEmpty() || password.isEmpty()) {
                if (username.isEmpty() && password.isEmpty()) {
                    Toast.makeText(MainActivity.this, "Please enter username and password", Toast.LENGTH_SHORT).show();
                } else if (username.isEmpty()) {
                    Toast.makeText(MainActivity.this, "Please enter username", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(MainActivity.this, "Please enter password", Toast.LENGTH_SHORT).show();
                }
                return;
            }

            // Build JSON data
            String jsonData = "{\"username\": \"" + username + "\", \"password\": \"" + password + "\"}";
            Log.d("MainActivity", "Sending data to server: " + jsonData);

            // Send data to server using HttpClient
            HttpClient.sendData("users", jsonData, response -> {
                runOnUiThread(() -> {
                    if (response != null) {
                        Log.d("MainActivity", "Response received from server: " + response);
                        if (response.contains("login success")) {
                            Toast.makeText(MainActivity.this, "Login successful!", Toast.LENGTH_SHORT).show();
                            Intent intent = new Intent(MainActivity.this, HomeActivity.class);
                            onDestroy();
                            startActivity(intent);
                        } else {
                            Toast.makeText(MainActivity.this, "Invalid username or password!", Toast.LENGTH_SHORT).show();
                        }
                    } else {
                        Log.e("MainActivity", "No response from server");
                        Toast.makeText(MainActivity.this, "Server error. Please try again later.", Toast.LENGTH_SHORT).show();
                    }
                });
            });
        });
    }

    private void setSignupButton() {
        // Find the button by its ID
        Button signupButton = findViewById(R.id.signupButton);

        // Set an OnClickListener for the button, create an Intent to navigate to SignupActivity
        signupButton.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, SignupActivity.class);
            onDestroy();
            startActivity(intent); // Start the new activity
        });
    }

    // Release the MediaPlayer when the activity is destroyed
    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mediaPlayer != null) {
            mediaPlayer.release();
        }
    }
}
