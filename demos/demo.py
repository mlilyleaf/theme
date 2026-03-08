"""
Python Demo - Data Processing Pipeline
This script demonstrates Python syntax highlighting in the Ravin theme
"""

import json
from datetime import datetime
from typing import List, Dict, Optional
from dataclasses import dataclass


@dataclass
class DataPoint:
    """Represents a single data point"""
    timestamp: datetime
    value: float
    label: str


class DataProcessor:
    """Process and analyze data points"""

    def __init__(self, name: str):
        self.name = name
        self.data: List[DataPoint] = []

    def add_data(self, data_points: List[DataPoint]) -> None:
        """Add data points to the processor"""
        self.data.extend(data_points)

    def filter_by_label(self, label: str) -> List[DataPoint]:
        """Filter data points by label"""
        return [dp for dp in self.data if dp.label == label]

    def calculate_statistics(self) -> Dict[str, float]:
        """Calculate basic statistics"""
        if not self.data:
            return {}

        values = [dp.value for dp in self.data]
        
        return {
            'count': len(values),
            'mean': sum(values) / len(values),
            'min': min(values),
            'max': max(values),
            'range': max(values) - min(values),
        }

    def export_json(self, filename: str) -> None:
        """Export data to JSON file"""
        data_dict = [
            {
                'timestamp': dp.timestamp.isoformat(),
                'value': dp.value,
                'label': dp.label,
            }
            for dp in self.data
        ]
        
        with open(filename, 'w') as f:
            json.dump(data_dict, f, indent=2)

    def __repr__(self) -> str:
        return f"DataProcessor(name={self.name!r}, data_points={len(self.data)})"


# Main execution
if __name__ == '__main__':
    # Create processor
    processor = DataProcessor('Temperature Monitor')
    
    # Generate sample data
    sample_data = [
        DataPoint(datetime.now(), 22.5, 'indoor'),
        DataPoint(datetime.now(), 18.3, 'outdoor'),
        DataPoint(datetime.now(), 21.8, 'indoor'),
        DataPoint(datetime.now(), 19.2, 'outdoor'),
    ]
    
    # Process data
    processor.add_data(sample_data)
    
    # Calculate and display statistics
    stats = processor.calculate_statistics()
    print(f'Processor: {processor}')
    print('Statistics:', json.dumps(stats, indent=2))
    
    # Export results
    processor.export_json('output.json')
    print('Data exported to output.json')
