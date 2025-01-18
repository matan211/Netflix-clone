package com.example.app1;

import android.app.Activity;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.text.InputType;
import android.util.TypedValue;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

// This is the Sign Up screen
public class SignupActivity extends Activity {

    private Button signUpButton;
    private EditText usernameInput, emailInput, passwordInput, repeatPasswordInput;
    private CheckBox termsCheckbox;
    private MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Initialize MediaPlayer with your audio file
        mediaPlayer = MediaPlayer.create(this, R.raw.song2);
        mediaPlayer.setLooping(true); // Set looping repeat
        mediaPlayer.start(); // Start playback

        // Set up the root layout
        LinearLayout rootLayout = new LinearLayout(this);
        rootLayout.setOrientation(LinearLayout.VERTICAL);
        rootLayout.setBackgroundColor(Color.parseColor("#121212"));
        rootLayout.setPadding(50, 100, 50, 100);

        // App Title
        TextView appTitle = new TextView(this);
        appTitle.setText("MitkademFlix - Sign Up");
        appTitle.setTextSize(TypedValue.COMPLEX_UNIT_SP, 42);
        appTitle.setTextColor(Color.WHITE);
        appTitle.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
        rootLayout.addView(appTitle);

        // Username Field
        usernameInput = new EditText(this);
        usernameInput.setHint("Username");
        usernameInput.setHintTextColor(Color.GRAY);
        usernameInput.setTextColor(Color.WHITE);
        usernameInput.setBackgroundColor(Color.parseColor("#1F1F1F"));
        usernameInput.setPadding(20, 20, 20, 20);
        usernameInput.setTextSize(TypedValue.COMPLEX_UNIT_SP, 18);
        rootLayout.addView(usernameInput);

        // Email Field
        emailInput = new EditText(this);
        emailInput.setHint("Email");
        emailInput.setHintTextColor(Color.GRAY);
        emailInput.setTextColor(Color.WHITE);
        emailInput.setBackgroundColor(Color.parseColor("#1F1F1F"));
        emailInput.setPadding(20, 20, 20, 20);
        emailInput.setTextSize(TypedValue.COMPLEX_UNIT_SP, 18);
        rootLayout.addView(emailInput);

        // Password Field
        passwordInput = new EditText(this);
        passwordInput.setHint("Password");
        passwordInput.setHintTextColor(Color.GRAY);
        passwordInput.setTextColor(Color.WHITE);
        passwordInput.setBackgroundColor(Color.parseColor("#1F1F1F"));
        passwordInput.setPadding(20, 20, 20, 20);
        passwordInput.setTextSize(TypedValue.COMPLEX_UNIT_SP, 18);
        passwordInput.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
        rootLayout.addView(passwordInput);

        // Repeat Password Field
        repeatPasswordInput = new EditText(this);
        repeatPasswordInput.setHint("Repeat Password");
        repeatPasswordInput.setHintTextColor(Color.GRAY);
        repeatPasswordInput.setTextColor(Color.WHITE);
        repeatPasswordInput.setBackgroundColor(Color.parseColor("#1F1F1F"));
        repeatPasswordInput.setPadding(20, 20, 20, 20);
        repeatPasswordInput.setTextSize(TypedValue.COMPLEX_UNIT_SP, 18);
        repeatPasswordInput.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
        rootLayout.addView(repeatPasswordInput);

        // Add Profile Picture Button (using an ImageView as a placeholder)
        ImageView profilePicture = new ImageView(this);
        profilePicture.setImageResource(R.drawable.ic_profile_picture_placeholder); // Replace with a real drawable
        profilePicture.setLayoutParams(new LinearLayout.LayoutParams(200, 200));
        profilePicture.setPadding(20, 20, 20, 20);
        rootLayout.addView(profilePicture);

        // CheckBox for agreeing to terms and conditions
        termsCheckbox = new CheckBox(this);
        termsCheckbox.setText("I agree to the terms and conditions of MitkademFlix");
        termsCheckbox.setTextColor(Color.WHITE);
        rootLayout.addView(termsCheckbox);

        // Sign Up Button
        signUpButton = new Button(this);
        signUpButton.setText("Sign Up");
        signUpButton.setTextSize(TypedValue.COMPLEX_UNIT_SP, 24);
        signUpButton.setBackgroundColor(Color.parseColor("#E50914"));
        signUpButton.setTextColor(Color.WHITE);
        signUpButton.setPadding(20, 20, 20, 20);
        signUpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Validate the fields before proceeding
                if (usernameInput.getText().toString().isEmpty() || emailInput.getText().toString().isEmpty() ||
                        passwordInput.getText().toString().isEmpty() || repeatPasswordInput.getText().toString().isEmpty()) {
                    // Toast.makeText(MainActivity.this, "Please fill in all fields.", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (!passwordInput.getText().toString().equals(repeatPasswordInput.getText().toString())) {
                    // Toast.makeText(MainActivity.this, "Passwords do not match.", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (!termsCheckbox.isChecked()) {
                    // Toast.makeText(MainActivity.this, "You must agree to the terms and conditions.", Toast.LENGTH_SHORT).show();
                    return;
                }

                // Proceed with sign-up (for now, just simulate it by finishing the activity)
                finish();
            }
        });
        rootLayout.addView(signUpButton);

        // Set the content view
        setContentView(R.layout.activity_signupactivity);

        //Registration request management
        sendSignUpRequest();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // Release the MediaPlayer when the activity is destroyed
        if (mediaPlayer != null) {
            mediaPlayer.release();
        }
    }

    private void sendSignUpRequest() {
        new Thread(() -> {
            try {
                String username = usernameInput.getText().toString();
                String firstName = username.contains(" ") ? username.substring(0, username.indexOf(" ")) : username;
                String lastName = username.contains(" ") ? username.substring(username.indexOf(" ") + 1) : username;
                String email = emailInput.getText().toString();
                String password = passwordInput.getText().toString();

                URL url = new URL("http://localhost:8080");
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);

                String jsonInput = String.format("{\"firstName\":\"%s\",\"lastName\":\"%s\",\"email\":\"%s\",\"password\":\"%s\"}",
                        firstName, lastName, email, password);

                OutputStream os = connection.getOutputStream();
                os.write(jsonInput.getBytes());
                os.flush();
                os.close();

                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    runOnUiThread(() -> Toast.makeText(SignupActivity.this, "Sign Up Successful!", Toast.LENGTH_SHORT).show());
                } else {
                    runOnUiThread(() -> Toast.makeText(SignupActivity.this, "Sign Up Failed!", Toast.LENGTH_SHORT).show());
                }

                connection.disconnect();
            } catch (Exception e) {
                runOnUiThread(() -> Toast.makeText(SignupActivity.this, "Error: " + e.getMessage(), Toast.LENGTH_SHORT).show());
            }
        }).start();
    }
}
