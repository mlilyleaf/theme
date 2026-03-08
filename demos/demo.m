% MATLAB Demo - Signal Processing Example
% This script demonstrates MATLAB syntax highlighting in the Ravin theme

function [output] = processSignal(input, sampleRate)
    % Process an input signal and apply filtering
    %
    % Args:
    %     input: Input signal vector
    %     sampleRate: Sampling rate in Hz
    %
    % Returns:
    %     output: Processed signal
    
    % Constants
    FILTER_ORDER = 4;
    CUTOFF_FREQ = 1000;
    
    % Design filter
    normalizedFreq = CUTOFF_FREQ / (sampleRate / 2);
    [b, a] = butter(FILTER_ORDER, normalizedFreq, 'low');
    
    % Apply filter
    filtered = filter(b, a, input);
    
    % Calculate statistics
    mean_val = mean(filtered);
    std_val = std(filtered);
    max_val = max(filtered);
    
    % Display results
    fprintf('Filter applied successfully\n');
    fprintf('Mean: %.4f, Std: %.4f, Max: %.4f\n', mean_val, std_val, max_val);
    
    output = filtered;
end

% Main execution
if nargin == 0
    % Generate test signal
    fs = 44100;  % Sample rate
    duration = 2;
    t = linspace(0, duration, fs * duration);
    
    % Compose signal from multiple frequencies
    signal = sin(2 * pi * 440 * t) + ...
             0.5 * sin(2 * pi * 880 * t) + ...
             0.3 * sin(2 * pi * 5000 * t) + ...
             randn(size(t)) * 0.1;
    
    % Process signal
    clean_signal = processSignal(signal, fs);
    
    % Plot results
    figure('Name', 'Signal Processing Demo');
    subplot(2, 1, 1);
    plot(t, signal, 'Color', [0.8 0.8 0.8]);
    title('Original Signal');
    xlabel('Time (s)');
    ylabel('Amplitude');
    
    subplot(2, 1, 2);
    plot(t, clean_signal, 'Color', [0.2 0.6 0.8]);
    title('Filtered Signal');
    xlabel('Time (s)');
    ylabel('Amplitude');
end
