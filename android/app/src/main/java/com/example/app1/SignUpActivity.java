package com.example.app1;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.text.InputType;
import android.util.TypedValue;
import android.view.View;
import android.widget.*;
import java.io.OutputStream;
import java.net.*;

// This is the Sign Up screen
public class SignupActivity extends Activity {

    private EditText usernameInput, emailInput, passwordInput, repeatPasswordInput;
    private CheckBox termsCheckbox;
    private MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mediaPlayer = MediaPlayer.create(this, R.raw.song2);
        mediaPlayer.setLooping(true); // Set looping repeat
        mediaPlayer.start();

        // Set the content view
        setContentView(R.layout.activity_signupactivity);
        addPicture();

        //Registration request management
        sendSignUpRequest();
    }

    private void sendSignUpRequest() {
        Button loginButton = findViewById(R.id.signUpButton);
        loginButton.setOnClickListener(v -> {
            // Initialize the input fields
            usernameInput = findViewById(R.id.usernameInput);
            emailInput = findViewById(R.id.emailInput);
            passwordInput = findViewById(R.id.passwordInput);
            repeatPasswordInput = findViewById(R.id.repeatPasswordInput);
            termsCheckbox = findViewById(R.id.termsCheckbox);

            // Get input values
            String username = usernameInput.getText().toString().trim();
            String email = emailInput.getText().toString().trim();
            String password = passwordInput.getText().toString().trim();
            String repeatPassword = repeatPasswordInput.getText().toString().trim();

            // Validate inputs
            if (username.isEmpty() || email.isEmpty() || password.isEmpty() || repeatPassword.isEmpty()) {
                Toast.makeText(this, "All fields are required!", Toast.LENGTH_SHORT).show();
                return;
            }

            if (!termsCheckbox.isChecked()) {
                Toast.makeText(this, "You must agree to the terms and conditions.", Toast.LENGTH_SHORT).show();
                return;
            }

            if (!password.equals(repeatPassword)) {
                Toast.makeText(this, "Passwords do not match!", Toast.LENGTH_SHORT).show();
                return;
            }

            // Build JSON data
            String jsonInput = String.format("{\"username\":\"%s\", \"email\":\"%s\", \"password\":\"%s\"}",
                    username, email, password);

            // Send request using HttpClient
            HttpClient.sendData("signup", jsonInput, response -> {
                runOnUiThread(() -> {
                    if (response != null) {
                        if (response.contains("success")) {
                            Toast.makeText(SignupActivity.this, "Sign Up Successful!", Toast.LENGTH_SHORT).show();
                            signUpFinish(); // Close the sign-up screen
                        } else {
                            Toast.makeText(SignupActivity.this, "Sign Up Failed: " + response, Toast.LENGTH_SHORT).show();
                        }
                    } else {
                        Toast.makeText(SignupActivity.this, "Server error. Please try again later.", Toast.LENGTH_SHORT).show();
                    }
                });
            });
        });
    }

    private void addPicture() {
        Button pictureButton = findViewById(R.id.addPictureButton);
        // Create an intent to pick an image from the gallery
        pictureButton.setOnClickListener(v -> {
            Intent intent = new Intent(Intent.ACTION_PICK);
            intent.setType("image/*");
            startActivityForResult(intent, 1); // Request code '1' to identify this request
        });
    }

    // Override the onActivityResult method to handle the selected image
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == 1 && resultCode == RESULT_OK && data != null) {
            // Get the selected image URI
            Uri selectedImageUri = data.getData();

            if (selectedImageUri != null) {
                ImageView imageView = new ImageView(this);

                // Calculate reduced size (quarter size) based on the screen width or a fixed value
                int screenWidth = getResources().getDisplayMetrics().widthPixels;
                int reducedWidth = (int) (screenWidth / 2.5);
                int reducedHeight = (int) (reducedWidth * 0.75);

                imageView.setLayoutParams(new LinearLayout.LayoutParams(reducedWidth, reducedHeight));
                imageView.setImageURI(selectedImageUri);

                // Add the ImageView dynamically to the LinearLayout
                LinearLayout layout = findViewById(R.id.layoutForImage);
                layout.removeAllViews(); // Clear previous images if any
                layout.addView(imageView);

                // Hide the "Add Picture" button after the image is selected
                Button addPictureButton = findViewById(R.id.addPictureButton);
                addPictureButton.setVisibility(View.GONE);  // Hide the button
            } else {
                Toast.makeText(this, "Failed to load image.", Toast.LENGTH_SHORT).show();
            }
        } else {
            Toast.makeText(this, "No image selected.", Toast.LENGTH_SHORT).show();
        }
    }



    // Release the MediaPlayer when the activity is destroyed
    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mediaPlayer != null) {
            mediaPlayer.release();
        }
    }

    protected void signUpFinish() {
        Intent intent = new Intent(SignupActivity.this, MainActivity.class);
        onDestroy();
        startActivity(intent); // Start the new activity
        finish();
    }
}
