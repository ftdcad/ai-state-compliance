import React from 'react';
import { ComplianceAlert } from '../types/admin';
import { ExternalLink, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { getPriorityColor, formatDateTime } from '../lib/utils';

interface AlertSourceModalProps {
  alert: ComplianceAlert | null;
  isOpen: boolean;
  onClose: () => void;
  onResolve: (alertId: string) => void;
}

const AlertSourceModal: React.FC<AlertSourceModalProps> = ({ 
  alert, 
  isOpen, 
  onClose, 
  onResolve 
}) => {
  if (!alert) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Alert Details
          </DialogTitle>
          <DialogDescription>
            Detailed information about this compliance alert
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Alert Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Badge className={getPriorityColor(alert.priority)}>
                {alert.priority} Priority
              </Badge>
              <Badge variant="outline">{alert.type}</Badge>
            </div>
            <h3 className="font-semibold text-lg mb-2">{alert.message}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {alert.state}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDateTime(alert.date)}
              </div>
            </div>
          </div>

          {/* Rule Information */}
          {alert.rule_id && (
            <div>
              <h4 className="font-semibold mb-2">Related Rule</h4>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <code className="text-sm font-mono text-blue-700 dark:text-blue-300">
                  {alert.rule_id}
                </code>
              </div>
            </div>
          )}

          {/* Source Documentation */}
          {alert.source && (
            <div>
              <h4 className="font-semibold mb-2">Source Documentation</h4>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm mb-3">{alert.source}</p>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Source Document
                </Button>
              </div>
            </div>
          )}

          {/* Action Required */}
          {alert.action_required && (
            <div>
              <h4 className="font-semibold mb-2">Action Required</h4>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-sm">
                  This alert requires immediate attention. Please review and take appropriate action.
                </p>
                {alert.deadline && (
                  <p className="text-sm mt-2 font-medium">
                    <strong>Deadline:</strong> {formatDateTime(alert.deadline)}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Compliance Impact */}
          <div>
            <h4 className="font-semibold mb-2">Compliance Impact</h4>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="text-sm">
                {alert.type === 'Rule Change' && 
                  'This rule change may affect current compliance procedures. Review existing processes and update as necessary.'}
                {alert.type === 'Sunset Warning' && 
                  'An existing rule is approaching its sunset date. Prepare for potential changes in compliance requirements.'}
                {alert.type === 'Bond Expiration' && 
                  'Professional bonds are expiring. Ensure timely renewal to maintain compliance.'}
                {alert.type === 'New Regulation' && 
                  'New regulatory requirements have been introduced. Update procedures to ensure compliance.'}
                {alert.type === 'Court Decision' && 
                  'A court decision may impact interpretation of existing rules. Review and assess implications.'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {!alert.resolved && (
              <Button 
                onClick={() => {
                  onResolve(alert.id);
                  onClose();
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                Mark as Resolved
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertSourceModal;