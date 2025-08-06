import '@/components/CentralizedContainer/CentralizedContainer.css';

interface CentralizedContainerProps {
    children: React.ReactNode;
}

function CentralizedContainer({ children }: CentralizedContainerProps) {
    return (
        <div className="centralized-container">
            {children}
        </div>
    );
}

export default CentralizedContainer;