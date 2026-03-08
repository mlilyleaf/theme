// C++ Demo - Data Structure Implementation
// This script demonstrates C++ syntax highlighting in the Ravin theme

#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
#include <string>

class Statistics {
public:
    /**
     * Calculate mean of a vector
     * @param data Input vector
     * @return Mean value
     */
    static double calculateMean(const std::vector<double>& data) {
        if (data.empty()) {
            return 0.0;
        }
        
        double sum = 0.0;
        for (const auto& value : data) {
            sum += value;
        }
        return sum / data.size();
    }

    /**
     * Calculate standard deviation
     * @param data Input vector
     * @return Standard deviation
     */
    static double calculateStdDev(const std::vector<double>& data) {
        if (data.empty()) {
            return 0.0;
        }
        
        double mean = calculateMean(data);
        double variance = 0.0;
        
        for (const auto& value : data) {
            double diff = value - mean;
            variance += diff * diff;
        }
        
        variance /= data.size();
        return std::sqrt(variance);
    }

    /**
     * Find minimum value
     * @param data Input vector
     * @return Minimum value
     */
    static double findMin(const std::vector<double>& data) {
        if (data.empty()) {
            return 0.0;
        }
        return *std::min_element(data.begin(), data.end());
    }

    /**
     * Find maximum value
     * @param data Input vector
     * @return Maximum value
     */
    static double findMax(const std::vector<double>& data) {
        if (data.empty()) {
            return 0.0;
        }
        return *std::max_element(data.begin(), data.end());
    }
};

/**
 * Main program
 */
int main() {
    // Create sample data
    std::vector<double> measurements = {22.5, 23.1, 21.8, 22.9, 23.3, 22.1, 22.7};
    
    // Calculate statistics
    double mean = Statistics::calculateMean(measurements);
    double stdDev = Statistics::calculateStdDev(measurements);
    double minVal = Statistics::findMin(measurements);
    double maxVal = Statistics::findMax(measurements);
    
    // Display results
    std::cout << "=== Statistics Report ===" << std::endl;
    std::cout << "Mean:        " << mean << std::endl;
    std::cout << "Std Dev:     " << stdDev << std::endl;
    std::cout << "Minimum:     " << minVal << std::endl;
    std::cout << "Maximum:     " << maxVal << std::endl;
    std::cout << "Sample Size: " << measurements.size() << std::endl;
    
    return EXIT_SUCCESS;
}
