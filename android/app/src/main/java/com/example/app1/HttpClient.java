package com.example.app1;

import android.util.*;
import android.os.AsyncTask;
import java.io.*;
import java.net.*;
import okhttp3.*;


public class HttpClient {
    private static final String TAG = "HttpClient";
    private static final String BASE_URL = "http://10.0.2.2:8080/";
    private static final OkHttpClient client = new OkHttpClient();

    // Method to send data to the server
    public static void sendData(String endpoint, String jsonData, ServerResponseListener listener) {
        String url = BASE_URL + endpoint;

        // Create a POST request
        RequestBody body = RequestBody.create(jsonData, MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        // Execute the request asynchronously
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e(TAG, "Network request failed", e);
                if (listener != null) {
                    listener.onResponseReceived(null); // Notify the listener
                }
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful() && response.body() != null) {
                    String responseBody = response.body().string();
                    Log.d(TAG, "Server response: " + responseBody);
                    if (listener != null) {
                        listener.onResponseReceived(responseBody); // Notify the listener with the response
                    }
                } else {
                    Log.e(TAG, "Invalid response from server: " + response.code());
                    if (listener != null) {
                        listener.onResponseReceived(null); // Notify the listener
                    }
                }
            }
        });
    }

    // Define a listener interface to handle the server response
    public interface ServerResponseListener {
        void onResponseReceived(String response);
    }
}
